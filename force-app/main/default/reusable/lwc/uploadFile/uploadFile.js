import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFileVersions from '@salesforce/apex/FileUtils.getVersionFiles';

export default class UploadFile extends LightningElement {
	loaded = false;
	@track fileList;
	@api recordId;
	@track files = [];
	get acceptedFormats() {
		return ['.pdf', '.png', '.jpg', '.jpeg'];
	}

	getFiles(fileIds) {
		getFileVersions({ recordIds: fileIds })
			.then(result => {
				console.log('result', result);
				this.fileList = result;
				this.files = [];
				for (let i = 0; i < this.fileList.length; i++) {
					let file = {
						Id: this.fileList[i].Id,
						Title: this.fileList[i].Title,
						Extension: this.fileList[i].FileExtension,
						ContentDocumentId: this.fileList[i].ContentDocumentId,
						ContentDocument: this.fileList[i].ContentDocument,
						CreatedDate: this.fileList[i].CreatedDate,
					};
					this.files.push(file);
				}
				this.loaded = true;
			})
			.catch(error => {
				console.log('error', error);
			});
	}

	handleUploadFinished(event) {
		const uploadedFiles = event.detail.files;
		console.log('uploadedFiles', JSON.stringify(uploadedFiles));

		// uploadedFiles

		// [{
		//     "name":"Test_PDF.pdf",
		//     "documentId":"0691x000002jJapAAE",
		//     "contentVersionId":"0681x000002mLKHAA2",
		//     "contentBodyId":"05T1x000008ldPGEAY",
		//     "mimeType":"application/pdf"
		// }]

		this.recordId = uploadedFiles[0].contentVersionId;

		let ids = uploadedFiles.map(file => file.contentVersionId);
		let names = uploadedFiles.map(file => file.name);

		console.log('ids', ids);
		console.log('names', names);

		this.getFiles(ids);

		const fileUploadedEvent = new CustomEvent('attachmentUploaded', {
			detail: { ids, names },
		});

		this.dispatchEvent(fileUploadedEvent);

		this.dispatchEvent(
			new ShowToastEvent({
				title: 'Success!',
				message: uploadedFiles.length + ' Files Uploaded Successfully.',
				variant: 'success',
			})
		);
	}

	removeAttachment(event) {
		const contentVersionId = event.detail.contentVersionId;
		console.log('contentVersionId', contentVersionId);
		const filterdFileList = this.files.filter(
			file => file.Id !== contentVersionId
		);
		this.files = filterdFileList;
		this.recordId = '';
		const removeAttachmentEvent = new CustomEvent('removeAttachment', {
			detail: { contentVersionId },
		});
		this.dispatchEvent(removeAttachmentEvent);
	}
}
