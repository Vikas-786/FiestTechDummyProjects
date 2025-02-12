package gw.lob.pa.rating

uses entity.PersonalAutoLine
uses gw.api.locale.DisplayKey
uses gw.policy.PolicyLineValidation
uses gw.validation.PCValidationContext
uses typekey.Job
uses typekey.PolicyLine

class PALineConsentValidator_Ext extends PolicyLineValidation<PersonalAutoLine> {

  /**
   * @param valContext a context to store validation issues
   * @param polLine    the policy line to validate
   */

  private static final var CONSENT_WIZARD_STEP = "BillingInfo"
  construct(valContext : PCValidationContext, polLine : PersonalAutoLine) {
    super(valContext, polLine)
  }

  override function doValidate() {
  validateUserConsent()

  }

 /* function validateUserConsent(policyPeriod : PolicyPeriod) {
    //if (policyPeriod.Lines.hasMatch(\line -> line.Subtype == PolicyLine.TC_PERSONALAUTOLINE)) {
      if ((policyPeriod.IsSubscriberOverridden == Boolean.FALSE and policyPeriod.Job.Subtype == Job.TC_SUBMISSION)) {
        Result.addError(policyPeriod, ValidationLevel.TC_READYFORISSUE, DisplayKey.get("Web.Policy.errorMessage"), "ViewQuote")
      }
      //throw new DisplayableException(DisplayKey.get("Web.Policy.errorMessage"))

  }
*/
  function validateUserConsent() {
    //if (policyPeriod.Lines.hasMatch(\line -> line.Subtype == PolicyLine.TC_PERSONALAUTOLINE)) {
   var policyPeriod : entity.PolicyPeriod
    if ((policyPeriod.IsSubscriberOverridden == Boolean.FALSE and policyPeriod.Job.Subtype == Job.TC_SUBMISSION)) {
      Result.addError(policyPeriod, ValidationLevel.TC_READYFORISSUE, DisplayKey.get("Web.Policy.errorMessage"), "ViewQuote")
    }

  }
  protected override function validateLineForAudit() {

  }
}