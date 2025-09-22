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
  sampleBooking
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

  // Sample data mapping
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
    const sampleData = sampleDataMap[module];
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
        支持的版本: OCPI 2.2.1-d2, OCPI 2.3.0 | 模块: Locations, Sessions, CDRs, Tariffs, Tokens, Commands, Bookings
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>选择OCPI版本</InputLabel>
            <Select value={version} label="选择OCPI版本" onChange={(e) => setVersion(e.target.value)}>
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
              <MenuItem value="commands/START_SESSION">Commands - START_SESSION</MenuItem>
              <MenuItem value="commands/STOP_SESSION">Commands - STOP_SESSION</MenuItem>
              <MenuItem value="commands/RESERVE_NOW">Commands - RESERVE_NOW</MenuItem>
              <MenuItem value="commands/CANCEL_RESERVATION">Commands - CANCEL_RESERVATION</MenuItem>
              <MenuItem value="commands/UNLOCK_CONNECTOR">Commands - UNLOCK_CONNECTOR</MenuItem>
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
            disabled={!sampleDataMap[module]}
          >
            加载示例数据
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
          当前版本: {version} | 示例数据可用性:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.keys(sampleDataMap).map((moduleKey) => (
            <Chip
              key={moduleKey}
              label={moduleKey}
              size="small"
              color={module === moduleKey ? "primary" : "default"}
              variant={sampleDataMap[moduleKey] ? "filled" : "outlined"}
            />
          ))}
          {version === '2.3.0' && (
            <Chip
              label="bookings"
              size="small"
              color={module === 'bookings' ? "primary" : "default"}
              variant="outlined"
            />
          )}
        </Box>
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
        placeholder="在此输入OCPI JSON数据，或点击'加载示例数据'按钮加载测试数据"
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