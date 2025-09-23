import React, { useState } from 'react';
import { validateOCPIJson } from './ocpi-validators';
import { 
  sampleLocation, 
  sampleSession, 
  sampleCDR, 
  sampleTariff, 
  sampleToken, 
  sampleStartSessionCommand,
  sampleStopSessionCommand,
  sampleReserveNowCommand,
  sampleCancelReservationCommand,
  sampleUnlockConnectorCommand,
  sampleBooking,
  sampleData_211,
  sampleData_221,
  sampleData_230
} from './sample-data';
import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Grid,
  Chip,
  Divider
} from '@mui/material';

function App() {
  const [module, setModule] = useState('locations');
  const [version, setVersion] = useState('2.2.1-d2');
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  // Version-specific sample data mapping
  const getVersionSpecificSampleData = (module, version) => {
    const isVersion230 = version === '2.3.0';
    const isVersion211 = version === '2.1.1-d2';
    
    // Core modules with version differences
    if (module === 'locations') {
      if (isVersion211) return sampleData_211.location;
      return isVersion230 ? sampleData_230.location : sampleData_221.location;
    }
    if (module === 'sessions') {
      if (isVersion211) return sampleData_211.session;
      return isVersion230 ? sampleData_230.session : sampleData_221.session;
    }
    if (module === 'cdrs') {
      if (isVersion211) return sampleData_211.cdr;
      // CDR is same for 2.2.1 and 2.3.0
      return sampleCDR;
    }
    if (module === 'tokens') {
      if (isVersion211) return sampleData_211.token;
      // Token is same for 2.2.1 and 2.3.0
      return sampleToken;
    }
    if (module === 'tariffs') {
      if (isVersion211) return sampleData_211.tariff;
      // Tariff is same for 2.2.1 and 2.3.0
      return sampleTariff;
    }
    if (module === 'bookings') {
      // Only available in 2.3.0
      return isVersion230 ? sampleData_230.booking : null;
    }
    
    // Commands are not supported in 2.1.1-d2
    if (isVersion211 && module.startsWith('commands/')) {
      return null;
    }
    
    // Modules without version differences (use legacy data for 2.2.1-d2 and 2.3.0)
    if (!isVersion211) {
      const legacySampleDataMap = {
        'commands/START_SESSION': sampleStartSessionCommand,
        'commands/STOP_SESSION': sampleStopSessionCommand,
        'commands/RESERVE_NOW': sampleReserveNowCommand,
        'commands/CANCEL_RESERVATION': sampleCancelReservationCommand,
        'commands/UNLOCK_CONNECTOR': sampleUnlockConnectorCommand
      };
      
      return legacySampleDataMap[module] || null;
    }
    
    return null;
  };

  // Sample data mapping (legacy compatibility)
  const sampleDataMap = {
    'locations': sampleLocation,
    'sessions': sampleSession,
    'cdrs': sampleCDR,
    'tariffs': sampleTariff,
    'tokens': sampleToken,
    'commands/START_SESSION': sampleStartSessionCommand,
    'commands/STOP_SESSION': sampleStopSessionCommand,
    'commands/RESERVE_NOW': sampleReserveNowCommand,
    'commands/CANCEL_RESERVATION': sampleCancelReservationCommand,
    'commands/UNLOCK_CONNECTOR': sampleUnlockConnectorCommand,
    'bookings': sampleBooking
  };

  const handleValidate = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const result = validateOCPIJson(module, jsonData, version);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [`JSON格式错误: ${error.message}`]
      });
    }
  };

  const loadSampleData = () => {
    // Use version-specific data when available
    const versionSpecificData = getVersionSpecificSampleData(module, version);
    const sampleData = versionSpecificData || sampleDataMap[module];
    
    if (sampleData) {
      setJsonInput(JSON.stringify(sampleData, null, 2));
      setValidationResult(null);
    }
  };

  const clearInput = () => {
    setJsonInput('');
    setValidationResult(null);
  };

  const formatJson = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [`JSON格式错误: ${error.message}`]
      });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>OCPI JSON验证工具</Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        支持的版本: OCPI 2.1.1-d2, OCPI 2.2.1-d2, OCPI 2.3.0 | 模块: Locations, Sessions, CDRs, Tariffs, Tokens, Commands, Bookings
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>选择OCPI版本</InputLabel>
            <Select value={version} label="选择OCPI版本" onChange={(e) => setVersion(e.target.value)}>
              <MenuItem value="2.1.1-d2">OCPI 2.1.1-d2</MenuItem>
              <MenuItem value="2.2.1-d2">OCPI 2.2.1-d2</MenuItem>
              <MenuItem value="2.3.0">OCPI 2.3.0</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>选择模块</InputLabel>
            <Select value={module} label="选择模块" onChange={(e) => setModule(e.target.value)}>
              <MenuItem value="locations">Locations</MenuItem>
              <MenuItem value="sessions">Sessions</MenuItem>
              <MenuItem value="cdrs">CDRs</MenuItem>
              <MenuItem value="tariffs">Tariffs</MenuItem>
              <MenuItem value="tokens">Tokens</MenuItem>
              {version !== '2.1.1-d2' && (
                <>
                  <MenuItem value="commands/START_SESSION">Commands - START_SESSION</MenuItem>
                  <MenuItem value="commands/STOP_SESSION">Commands - STOP_SESSION</MenuItem>
                  <MenuItem value="commands/RESERVE_NOW">Commands - RESERVE_NOW</MenuItem>
                  <MenuItem value="commands/CANCEL_RESERVATION">Commands - CANCEL_RESERVATION</MenuItem>
                  <MenuItem value="commands/UNLOCK_CONNECTOR">Commands - UNLOCK_CONNECTOR</MenuItem>
                </>
              )}
              {version === '2.3.0' && (
                <MenuItem value="bookings">Bookings (2.3.0)</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={loadSampleData}
            disabled={!getVersionSpecificSampleData(module, version) && !sampleDataMap[module]}
          >
            加载示例数据 ({version})
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={formatJson} disabled={!jsonInput}>
            格式化JSON
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="warning" onClick={clearInput}>
            清空
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleValidate} disabled={!jsonInput}>
            验证
          </Button>
        </Grid>
      </Grid>

      {/* Version and Sample Data Availability Indicator */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          当前版本: {version} | 示例数据可用性 (版本特定):
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['locations', 'sessions', 'cdrs', 'tokens', 'tariffs', 'bookings'].map((moduleKey) => {
            const hasVersionSpecificData = getVersionSpecificSampleData(moduleKey, version) !== null;
            const isCurrentModule = module === moduleKey;
            const isSupported = version !== '2.1.1-d2' || !['bookings'].includes(moduleKey);
            
            if (!isSupported) return null;
            
            return (
              <Chip
                key={moduleKey}
                label={`${moduleKey} (${version})`}
                size="small"
                color={isCurrentModule ? "primary" : "default"}
                variant={hasVersionSpecificData ? "filled" : "outlined"}
              />
            );
          })}
          {/* Show command modules only for versions that support them */}
          {version !== '2.1.1-d2' && Object.keys(sampleDataMap).filter(key => key.startsWith('commands/')).map((moduleKey) => {
            const isCurrentModule = module === moduleKey;
            return (
              <Chip
                key={moduleKey}
                label={`${moduleKey} (legacy)`}
                size="small"
                color={isCurrentModule ? "primary" : "default"}
                variant="outlined"
              />
            );
          })}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          填充: 版本特定数据 | 轮廓: 通用数据 | 绿色: 当前模块
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />
      
      <TextField
        label="JSON输入"
        multiline
        rows={15}
        fullWidth
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ mb: 3 }}
        placeholder="在此输入OCPI JSON数据，或点击'加载示例数据'按钮加载版本特定的测试数据"
      />
      
      {validationResult && (
        <Paper sx={{ mt: 3, p: 3 }}>
          {validationResult.valid ? (
            <>
              <Typography color="primary" variant="h6" sx={{ mb: 2 }}>
                ✅ 验证通过！
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JSON数据符合OCPI {version}规范
              </Typography>
            </>
          ) : (
            <>
              <Typography color="error" variant="h6" sx={{ mb: 2 }}>
                ❌ 验证失败
              </Typography>
              <List dense>
                {validationResult.errors.map((error, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={error}
                      primaryTypographyProps={{ variant: 'body2', color: 'error' }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default App;