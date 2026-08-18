"""
Continuous Learning Module for SupplyPrescript
"""


class ContinuousLearning:
    """
    Uses evaluation results to decide
    whether model retraining is required.
    """

    def analyze(self, evaluation_report):
        report = {}

        if evaluation_report.get("roi") == "Negative":
            report["retrain_required"] = True
            report["reason"] = "High prediction error detected."
        else:
            report["retrain_required"] = False
            report["reason"] = "Model performance is acceptable."

        return report