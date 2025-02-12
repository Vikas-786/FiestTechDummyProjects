package gw.customclasses

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil
uses pcf.SubmissionWizard
uses pcf.SubmissionWizard_QuoteScreen
uses typekey.Job
uses typekey.PolicyLine

class MyCustomValidationNew extends PCValidationContext {
  /**
   * Constructor
   *
   * @param valLevel ValidationLevel at which validation should be performed
   */
  construct(valLevel : ValidationLevel) {
    super(valLevel)
  }

  //test function 1 - Using ValContext
  function validateUserConsent(policyPeriod : PolicyPeriod) {
    if (policyPeriod.Lines.hasMatch(\line -> line.Subtype == PolicyLine.TC_PERSONALAUTOLINE)) {
      if ((policyPeriod.IsSubscriberOverridden == Boolean.FALSE)) {
        Result.addError(policyPeriod, ValidationLevel.TC_READYFORISSUE, DisplayKey.get("Web.Policy.errorMessage"), "BillingInfo")
      }
      //throw new DisplayableException(DisplayKey.get("Web.Policy.errorMessage"))
    }
  }
//demo changes
}






















  /*// test function 2
  static function validateUserDataAnotherWay(policyPeriod : PolicyPeriod) {
    if ((policyPeriod.IsSubscriberOverridden == Boolean.FALSE)) {
      //Result.addError(_period, ValidationLevel.TC_READYFORISSUE, DisplayKey.get("Web.Policy.errorMessage"))
      //throw new DisplayableException(DisplayKey.get("Web.Policy.errorMessage"))
      LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.Policy.errorMessage"))
      LocationUtil.addRequestScopedWarningMessage(DisplayKey.get("Web.Policy.errorMessage"))
    }
  }
  // LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
*/

