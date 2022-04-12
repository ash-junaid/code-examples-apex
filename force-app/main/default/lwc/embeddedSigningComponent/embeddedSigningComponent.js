import { LightningElement, api } from 'lwc';
import sendEnvelope from '@salesforce/apex/EmbeddedSigningController.sendEnvelope';
import getEmbeddedSigningUrl from '@salesforce/apex/EmbeddedSigningController.getEmbeddedSigningUrl';

export default class EmbeddedSigningComponent extends LightningElement {

    template = '1e85b6a7-2c1e-45d8-990c-ea6affb6dea2';
    description = 'Embedded Signing';
    @api recordId;
    handleClick() {
        sendEnvelope({template: this.template, description: this.description, recordId: this.recordId})
            .then((envelopeId) => (
                getEmbeddedSigningUrl({
                    envId: envelopeId, 
                    url: window.location.href
                })
            ))
            .then((signingUrl) => {
                window.location.href = signingUrl;
            })
            .catch((error) => {
                console.log('Error:');
                console.log(error);
            });
    }
}