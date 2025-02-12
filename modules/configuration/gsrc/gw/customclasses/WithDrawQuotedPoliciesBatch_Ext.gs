package gw.customclasses

uses gw.api.database.DBFunction
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.util.DateUtil
uses gw.processes.BatchProcessBase
uses typekey.Job

class WithDrawQuotedPoliciesBatch_Ext extends BatchProcessBase {

  public construct() {
    super(BatchProcessType.TC_WITHDRAWQUOTEDPOLICIESBATCH)
  }

  protected override function doWork() {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      for (quotedPolicy in getQuotedPolicies()) {
        if (quotedPolicy != null) {
          var policyInBundle = bundle.add(quotedPolicy)
          policyInBundle.JobProcess.withdrawJob()
        }
      }
    })
  }

  function getQuotedPolicies() : PolicyPeriod[] {

    var quotedPolicies = Query.make(PolicyPeriod)
        .compare(PolicyPeriod#Status, Relop.Equals, PolicyPeriodStatus.TC_QUOTED)
        .compare(PolicyPeriod#EditEffectiveDate, Relop.LessThan, DateUtil.currentDate())

    var jobsLinkedToPolicies = quotedPolicies.join(PolicyPeriod#Job)

    var filteredQuotedPolicies = jobsLinkedToPolicies.or(\jobFilter -> {
      jobFilter.compare(entity.Job#Subtype, Relop.Equals, Job.TC_POLICYCHANGE)
      jobFilter.compare(entity.Job#Subtype, Relop.Equals, Job.TC_REINSTATEMENT)
    }).select()

    return filteredQuotedPolicies.toTypedArray()
  }

  /*public construct() {
    super(BatchProcessType.TC_WITHDRAWQUOTEDPOLICIESBATCH) //registering the currentbatch
  }

  function getQuotedPolicyWithDraw()
  {

  }
    protected override function doWork() {

    *//* gw.transaction.Transaction.runWithNewBundle(\bundle -> {

        //Step 1.) Querying policies quoted 2 days back
        var policyQuery = Query.make(PolicyPeriod)
            .compare(PolicyPeriod#Status, Relop.Equals, PolicyPeriodStatus.TC_QUOTED)
            .join(PolicyPeriod#Job)
            .compare(entity.Job#Subtype, Relop.Equals, "PolicyChange")
            .compare(PolicyPeriod#EditEffectiveDate, Relop.Equals, DateUtil.currentDate().addDays(-2) )
            .select()

        //Step 2.)  Processing each policy one by one and changing its current status to withdrawn
        policyQuery.each(\policy -> {
          var policyInBundle = bundle.add(policy)
          policyInBundle.Status = PolicyPeriodStatus.TC_WITHDRAWN
        })
      })*//*

     }*/

}
