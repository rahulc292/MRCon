import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    Devices: any = [];

    constructor() {
        var data = window.localStorage.getItem('Devices');
        if (data)
            this.Devices = JSON.parse(data);
        else
            this.Devices = [];
    }

    AddDevice(Name, Mac, Category, WaterPumpMode, IP, IsDirectConnected, rangevalue, iswateron, isswingon, IsOn, SSID, WaterLevel) {
        var obj = this.Devices.filter(d => d.Mac == Mac);
        if (obj.length > 0)
            return "Device already exists.";
        else {
            var device = {};
            if (Category == 'cooler')
                device = { 'Name': Name, 'SSID': SSID, 'Mac': Mac, 'Category': Category, 'IsOn': IsOn, 'rangevalue': rangevalue, 'iswateron': iswateron, 'isswingon': isswingon, 'IsOnline': false, 'DeviceImage': 'cooler.png', 'WaterPumpMode': WaterPumpMode, 'IP': IP, 'IsDirectConnected': IsDirectConnected, 'WaterLevel': WaterLevel };
            else
                device = { 'Name': Name, 'SSID': SSID, 'Mac': Mac, 'Category': Category, 'IsOn': IsOn, 'rangevalue': rangevalue, 'iswateron': iswateron, 'isswingon': isswingon, 'IsOnline': false, 'DeviceImage': 'fan.png', 'WaterPumpMode': WaterPumpMode, 'IP': IP, 'IsDirectConnected': IsDirectConnected, 'WaterLevel': WaterLevel };
            this.Devices.push(device);
            window.localStorage.setItem('Devices', JSON.stringify(this.Devices));
            return "Device Added Successfully.";
        }
    }

    GetDevices() {
        return this.Devices;
    }

    GetDeviceDetails(Mac) {
        return this.Devices.filter(d => d.Mac == Mac)[0];
    }

    UpdateDeviceDetails(data) {
        var obj = this.Devices.filter(d => d.Mac == data.Mac)[0];
        this.Devices[this.Devices.indexOf(obj)] = data;
        window.localStorage.setItem('Devices', JSON.stringify(this.Devices));
    }

    DeleteDevice(data) {
        var obj = this.Devices.filter(d => d.Mac == data.Mac)[0];
        this.Devices.splice(this.Devices.indexOf(obj), 1);
        window.localStorage.setItem('Devices', JSON.stringify(this.Devices));
    }
}