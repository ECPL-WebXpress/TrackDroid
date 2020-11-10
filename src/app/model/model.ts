export interface Input {
    GPSData:    GPSData;
    DeviceID:   string;
    VehicleID:  string;
    CustomerID: string;
    DateTime:   string;
    Provider:   string;
}

export interface GPSData {
    Speed:       string;
    Satellites:  string;
    GPSDateTime: string;
    NetworkInfo: string;
    Latitude:    string;
    GPSStatus:   string;
    Longitude:   string;
    Location:    string;
    Altitude:    string;
}
export interface LoginOutputModel {
    AccessKey:  string;
    DeviceId:   string;
    Message:    string;
    CustomerId: string;
    VehicleNo: string;
    IsSuccess:  boolean;
}

