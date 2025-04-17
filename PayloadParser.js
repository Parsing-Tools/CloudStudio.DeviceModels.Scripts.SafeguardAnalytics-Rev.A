function parseUplink(device, payload)
{
    var Payload = payload.asJsonObject();
    env.log(Payload);

    if (Payload.XES && Payload.XES[0] != null) {
        var dataEntry = Payload.XES[0];
        var serverName = dataEntry.server_name;
        var name = dataEntry.name;

        // Clean and parse data
        var rawData = dataEntry.data; // e.g. "[21.022013]"
        var parsedValue = 0;

        if (typeof rawData === "string") {
            var cleaned = rawData.replace("[", "").replace("]", "");
            parsedValue = parseFloat(cleaned);
        }

        // Device_01
        if (serverName === "Device_01") {
            if (name === "device_status") {
                var dev01status = device.endpoints.byAddress("2");
                if (dev01status != null)
                    dev01status.updateGenericSensorStatus(parsedValue);
            }
            else if (name === "device_reading") {
                var dev01reading = device.endpoints.byAddress("1");
                if (dev01reading != null)
                    dev01reading.updatePpmConcentrationSensorStatus(parsedValue);
            }
        }

        // Device_02
        if (serverName === "Device_02") {
            if (name === "device_status") {
                var dev02status = device.endpoints.byAddress("4");
                if (dev02status != null)
                    dev02status.updateGenericSensorStatus(parsedValue);
            }
            else if (name === "device_reading") {
                var dev02reading = device.endpoints.byAddress("3");
                if (dev02reading != null)
                    dev02reading.updatePpmConcentrationSensorStatus(parsedValue);
            }
        }
    }
}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}