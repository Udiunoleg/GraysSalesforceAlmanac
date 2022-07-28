import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import NUMBER_FIELD from '@salesforce/schema/Account.Id';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import OWNER_FIELD from '@salesforce/schema/Account.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class CustomRecordDetails extends LightningElement {
	// Expose a field to make it available in the template
	nameField = NAME_FIELD;
	numberField = NUMBER_FIELD;
	ownerField = OWNER_FIELD;
	raitngField = RATING_FIELD;
	phoneField = PHONE_FIELD;

	fields = [NAME_FIELD, NUMBER_FIELD, OWNER_FIELD, RATING_FIELD, PHONE_FIELD];

	// Flexipage provides recordId and objectApiName
	@api recordId;
	@api objectApiName;

	@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
	objectInfo;

	connectedCallback() {
		console.log('@@connectedCallback');
		console.log('@@objectInfo', this.objectInfo.data.fields);
	}
}
