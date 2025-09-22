# OCPI 2.2.1-d2 JSON Validator Usage Guide

## How to Use the Test Data (`sample-data.js`)

The application includes comprehensive sample test data for all supported OCPI 2.2.1-d2 modules. Here's how to use it:

### 🚀 **1. Using the Web Interface (Recommended)**

1. **Start the application**: 
   ```bash
   npm start
   ```
   Or visit: http://localhost:3000

2. **Select a module** from the dropdown (e.g., "Locations", "Sessions", "CDRs", etc.)

3. **Click "加载示例数据" (Load Sample Data)** button to automatically load the corresponding test data

4. **Click "验证" (Validate)** to test the validation

5. **Use other buttons**:
   - **格式化JSON**: Format/prettify the JSON
   - **清空**: Clear the input area
   - **验证**: Validate the JSON against OCPI schema

### 📝 **2. Available Sample Data**

The `sample-data.js` file contains test data for:

#### ✅ **Locations Module**
```javascript
import { sampleLocation } from './sample-data';
// Contains: coordinates, EVSEs, connectors, business details
```

#### ✅ **Sessions Module**
```javascript
import { sampleSession } from './sample-data';
// Contains: charging periods, costs, token info, status
```

#### ✅ **CDRs Module**
```javascript
import { sampleCDR } from './sample-data';
// Contains: complete charging record, location, costs, energy
```

#### ✅ **Tariffs Module**
```javascript
import { sampleTariff } from './sample-data';
// Contains: pricing elements, price components, restrictions
```

#### ✅ **Tokens Module**
```javascript
import { sampleToken } from './sample-data';
// Contains: auth info, whitelist status, issuer details
```

#### ✅ **Commands Module**
```javascript
import { 
  sampleStartSessionCommand,
  sampleStopSessionCommand,
  sampleReserveNowCommand,
  sampleCancelReservationCommand,
  sampleUnlockConnectorCommand
} from './sample-data';
```

### 💻 **3. Using Sample Data Programmatically**

You can also import and use the sample data in your own code:

```javascript
import { 
  sampleLocation, 
  sampleSession, 
  sampleCDR 
} from './src/sample-data';
import { validateOCPIJson } from './src/ocpi-validators';

// Test Location validation
const locationResult = validateOCPIJson('locations', sampleLocation);
console.log('Location validation:', locationResult);

// Test Session validation
const sessionResult = validateOCPIJson('sessions', sampleSession);
console.log('Session validation:', sessionResult);

// Test CDR validation
const cdrResult = validateOCPIJson('cdrs', sampleCDR);
console.log('CDR validation:', cdrResult);
```

### 🧪 **4. Testing Different Scenarios**

#### **Valid Data Testing**
```javascript
// All sample data is designed to pass validation
const result = validateOCPIJson('locations', sampleLocation);
console.log(result.valid); // Should be true
```

#### **Invalid Data Testing**
```javascript
// Remove required fields to test validation
const invalidData = { ...sampleLocation };
delete invalidData.country_code; // Remove required field

const result = validateOCPIJson('locations', invalidData);
console.log(result.errors); // Will show validation errors
```

#### **Field Format Testing**
```javascript
// Test with wrong field formats
const invalidSession = {
  ...sampleSession,
  start_date_time: "invalid-date", // Should be ISO datetime
  kwh: -5 // Should be non-negative
};

const result = validateOCPIJson('sessions', invalidSession);
console.log(result.errors); // Will show format errors
```

### 🎯 **5. Custom Test Data Creation**

You can create your own test data based on the sample structure:

```javascript
const myCustomLocation = {
  "country_code": "DE",
  "party_id": "XYZ",
  "id": "MY_LOC_001",
  "publish": true,
  "address": "Musterstraße 123",
  "city": "Berlin",
  "country": "DEU",
  "coordinates": {
    "latitude": "52.520008",
    "longitude": "13.404954"
  },
  // ... add other required fields
  "time_zone": "Europe/Berlin",
  "last_updated": new Date().toISOString()
};

// Test your custom data
const result = validateOCPIJson('locations', myCustomLocation);
```

### 🔍 **6. What Each Sample Contains**

**Location Sample:**
- Complete address and coordinates
- EVSE with connectors
- Power specifications
- Timestamps

**Session Sample:**
- Start/end times
- Energy consumption (kWh)
- Charging periods
- Cost information
- Token details

**CDR Sample:**  
- Complete billing record
- Location details
- Energy totals
- Cost breakdown

**Tariff Sample:**
- Pricing elements
- Price components
- Currency information

**Token Sample:**
- Authentication details
- Whitelist status
- Issuer information

**Command Samples:**
- All 5 command types
- Required parameters
- Response URLs

### 🎮 **7. Interactive Features**

The web interface provides:

1. **Module Selection**: Choose from all OCPI modules
2. **Sample Data Loading**: One-click sample data loading
3. **JSON Formatting**: Pretty-print JSON data
4. **Real-time Validation**: Instant validation feedback
5. **Error Details**: Detailed error messages with field paths
6. **Visual Indicators**: Color-coded validation results

### ⚠️ **Important Notes**

1. **All sample data is valid** - designed to pass OCPI 2.2.1-d2 validation
2. **Modify carefully** - changing field types or removing required fields will cause validation failures
3. **Use for testing** - Perfect for testing your validation logic and understanding OCPI structure
4. **Production ready** - Sample data follows real-world OCPI patterns

### 🔧 **Troubleshooting**

**Common Issues:**

1. **Validation fails on sample data**: 
   - Check if you selected the correct module
   - Ensure the sample data wasn't modified

2. **JSON format errors**:
   - Use the "格式化JSON" button to fix formatting
   - Check for missing commas or brackets

3. **Module not found**:
   - Ensure the module name matches exactly
   - Check available modules in the dropdown

The sample test data provides a comprehensive foundation for testing and understanding OCPI 2.2.1-d2 JSON validation!