public class FileUtils {

    public static ContentVersion insertFile(String title, Blob body, Id parentId) {
        ContentVersion cont = new ContentVersion();     
        cont.Title = title;
        cont.PathOnClient = title;
        cont.VersionData = Body;
        cont.Origin = 'H';
        
        cont.FirstPublishLocationId = parentId;
        
        insert cont;
        return cont;
    }

	@AuraEnabled(cacheable=true)
    public static List<ContentVersion> getVersionFiles(List<String> recordIds){

        try {
                return [
            SELECT
            Id,
                    Title,
                    ContentDocumentId,
                    FileType, 
            ContentSize,
            FileExtension,
            VersionNumber,
            CreatedDate,
            VersionData,
                    FirstPublishLocationId
            FROM ContentVersion
            WHERE Id IN: recordIds
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}