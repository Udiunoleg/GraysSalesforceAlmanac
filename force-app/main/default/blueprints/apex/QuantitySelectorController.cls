public without sharing class QuantitySelectorController {
    
    // @AuraEnabled
    // public static PurchaseQuantityRule getProductQuantityRule(String productId){

    //     List<PurchaseQuantityRule> purQuanRuleList;
    //     PurchaseQuantityRule prQntyRule;

    //     try {
    //         List<Product2> prodList = [SELECT Name FROM Product2 WHERE Id =: productId];
    //         if (!prodList.isEmpty()) {
    //             purQuanRuleList = [SELECT id, Minimum, Maximum, Name, Increment FROM PurchaseQuantityRule ];
                
    //             if(!purQuanRuleList.isEmpty()){
    //                 prQntyRule = purQuanRuleList[0];
    //             }
    //         }

    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    //     return prQntyRule;
    // }

	@AuraEnabled
    public static void getProductQuantityRule(String productId){}

}
