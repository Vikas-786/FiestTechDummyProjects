package gw.customclasses

uses gw.admin.affinitygroup.AffinityGroupValidation
uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil

class MyCustomValidation_Ext extends PCValidationBase {

  static var _period = new PolicyPeriod()

  /**
   * Constructor that takes a validation context, which holds the level to perform validation at and the
   * validation results (errors and warnings).
   *
   * @param valContext
   */
  protected construct(valContext : PCValidationContext) {
    super(valContext)
  }

  protected override function validateImpl() {
    var atIssue = Context.isAtLeast(ValidationLevel.TC_READYFORISSUE)

    if((_period.IsSubscriberOverridden == Boolean.FALSE) && (atIssue == true)) {
      Result.addError(_period, ValidationLevel.TC_READYFORISSUE, DisplayKey.get("Web.Policy.errorMessage"))
    }
  }

   function validateDetails() {
    //var atIssue = PCValidationContext.isAtLeast(ValidationLevel.TC_READYFORISSUE)
    if((_period.IsSubscriberOverridden == Boolean.FALSE)) {
      Result.addError(_period, ValidationLevel.TC_READYFORISSUE, DisplayKey.get("Web.Policy.errorMessage"))
    }
  }

  static function validate(myCustomValidation : MyCustomValidation_Ext) {
    var context = ValidationUtil.createContext(ValidationLevel.TC_READYFORISSUE)
    new MyCustomValidation_Ext(context).validate()
    context.raiseExceptionIfProblemsFound()
  }


}