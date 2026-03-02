import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import LanguageToggle from './components/LanguageToggle';

function App() {
  const { t } = useTranslation();
  const [module, setModule] = useState('locations');
  const [version, setVersion] = useState('2.2.1-d2');
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  // Reset module when version changes to ensure compatibility
  useEffect(() => {
    // If current module is a command and version is 2.1.1-d2, reset to locations
    if (version === '2.1.1-d2' && module.startsWith('commands/')) {
      setModule('locations');
      setJsonInput('');
      setValidationResult(null);
    }
    // If current module is bookings and version is not 2.3.0, reset to locations
    if (version !== '2.3.0' && module === 'bookings') {
      setModule('locations');
      setJsonInput('');
      setValidationResult(null);
    }
  }, [version]);

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
      const result = validateOCPIJson(module, jsonData, version, t);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [t('validation.error.jsonFormat', { message: error.message })]
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
        errors: [t('validation.error.jsonFormat', { message: error.message })]
      });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <LanguageToggle />
      <Typography variant="h4" gutterBottom>{t('ui.header.title')}</Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('ui.header.subtitle')}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>{t('ui.form.selectVersion')}</InputLabel>
            <Select value={version} label={t('ui.form.selectVersion')} onChange={(e) => setVersion(e.target.value)}>
              <MenuItem value="2.1.1-d2">OCPI 2.1.1-d2</MenuItem>
              <MenuItem value="2.2.1-d2">OCPI 2.2.1-d2</MenuItem>
              <MenuItem value="2.3.0">OCPI 2.3.0</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>{t('ui.form.selectModule')}</InputLabel>
            <Select 
              value={module} 
              label={t('ui.form.selectModule')} 
              onChange={(e) => {
                const newModule = e.target.value;
                console.log('Module selected:', newModule);
                setModule(newModule);
                setJsonInput('');
                setValidationResult(null);
              }}
            >
              <MenuItem value="locations">{t('common.modules.locations')}</MenuItem>
              <MenuItem value="sessions">{t('common.modules.sessions')}</MenuItem>
              <MenuItem value="cdrs">{t('common.modules.cdrs')}</MenuItem>
              <MenuItem value="tariffs">{t('common.modules.tariffs')}</MenuItem>
              <MenuItem value="tokens">{t('common.modules.tokens')}</MenuItem>
              {version !== '2.1.1-d2' && [
                <MenuItem key="cmd-start" value="commands/START_SESSION">{t('common.modules.commands.START_SESSION')}</MenuItem>,
                <MenuItem key="cmd-stop" value="commands/STOP_SESSION">{t('common.modules.commands.STOP_SESSION')}</MenuItem>,
                <MenuItem key="cmd-reserve" value="commands/RESERVE_NOW">{t('common.modules.commands.RESERVE_NOW')}</MenuItem>,
                <MenuItem key="cmd-cancel" value="commands/CANCEL_RESERVATION">{t('common.modules.commands.CANCEL_RESERVATION')}</MenuItem>,
                <MenuItem key="cmd-unlock" value="commands/UNLOCK_CONNECTOR">{t('common.modules.commands.UNLOCK_CONNECTOR')}</MenuItem>
              ]}
              {version === '2.3.0' && (
                <MenuItem value="bookings">{t('common.modules.bookings')} (2.3.0)</MenuItem>
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
            {t('common.actions.loadSample', { version })}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={formatJson} disabled={!jsonInput}>
            {t('common.actions.formatJson')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="warning" onClick={clearInput}>
            {t('common.actions.clear')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleValidate} disabled={!jsonInput}>
            {t('common.actions.validate')}
          </Button>
        </Grid>
      </Grid>

      {/* Version and Sample Data Availability Indicator */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {t('ui.indicators.currentVersion', { version })}
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
                label={`${t('common.modules.' + moduleKey)} ${t('common.versionSpecific', { version })}`}
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
                label={`${t('common.modules.commands.' + moduleKey.split('/')[1])} ${t('common.legacy')}`}
                size="small"
                color={isCurrentModule ? "primary" : "default"}
                variant="outlined"
              />
            );
          })}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {t('ui.indicators.filled')} | {t('ui.indicators.outlined')} | {t('ui.indicators.current')}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />
      
      <TextField
        label={t('ui.form.jsonInput')}
        multiline
        rows={15}
        fullWidth
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ mb: 3 }}
        placeholder={t('ui.form.placeholder')}
      />
      
      {validationResult && (
        <Paper sx={{ mt: 3, p: 3 }}>
          {validationResult.valid ? (
            <>
              <Typography color="primary" variant="h6" sx={{ mb: 2 }}>
                {t('validation.success.passed')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('validation.success.description', { version })}
              </Typography>
            </>
          ) : (
            <>
              <Typography color="error" variant="h6" sx={{ mb: 2 }}>
                {t('validation.failed')}
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