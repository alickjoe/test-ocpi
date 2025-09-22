import React, { useState } from 'react';
import { validateOCPIJson } from './ocpi-validators';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [module, setModule] = useState('locations');
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleValidate = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const result = validateOCPIJson(module, jsonData);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [`JSON格式错误: ${error.message}`]
      });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>OCPI 2.2.1-d2 JSON验证工具</Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        支持的模块: Locations, Sessions, CDRs, Tariffs, Tokens, Commands
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
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
        </Select>
      </FormControl>
      
      <TextField
        label="JSON输入"
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ mb: 3 }}
      />
      
      <Button variant="contained" color="primary" onClick={handleValidate}>
        验证
      </Button>
      
      {validationResult && (
        <Paper sx={{ mt: 3, p: 3 }}>
          {validationResult.valid ? (
            <Typography color="primary">验证通过！</Typography>
          ) : (
            <>
              <Typography color="error">验证失败：</Typography>
              <List>
                {validationResult.errors.map((error, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={error} />
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