/*
 *  REST API: System Routes
 */
import { Router } from "express";
import { system_getApplicationInfo, system_getWirelessAddress, system_getWirelessSSID, system_restart, system_updateApplication } from "../system";
const router = Router();

/* Network */

/* Get the Azure Device Provisioning Service for IoT Hub provisioning parameters */
router.get('/network/settings', async(req:any, res:any)=>{
    try{
        const settings = {
            ssid: await system_getWirelessSSID(),
            ipAddress: await system_getWirelessAddress('wlan0')
        }
        return res.send(settings);
    }
    catch( err ){
        return res.status(500).send({message:err});
    }
});

/*  System Application */

/* Get the system application info */
router.get('/application/info', (req:any, res:any)=>{
    system_getApplicationInfo()
        .then((appInfo:any)=>{
            return res.send(appInfo);

        })
        .catch((err)=>{
            return res.status(500).send({message:err});
        });
});

/* Update the system application */
router.post('/application/update', (req:any, res:any)=>{
    system_updateApplication()
        .then((message)=>{
            return res.send({message:message});
        })
        .catch((err)=>{
            return res.status(500).send({message:err});
        });
});

/* System */

/* Reboot the system */
router.post('/reboot', (req:any, res:any)=>{
    try{
            system_restart(2000);
            return res.send({message:'Restarting system'});
    } catch( err ){
        return res.status(500).send({message:err});
    }
});
export default router;