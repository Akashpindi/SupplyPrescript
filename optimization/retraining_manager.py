"""
Retraining Manager for SupplyPrescript
"""


class RetrainingManager:
    """
    Decides whether the prediction model
    should be retrained.
    """

    def should_retrain(self, feedback):
        if feedback.get("roi") == "Negative":
            return {
                "retrain": True,
                "reason": "Prediction performance dropped."
            }

        return {
            "retrain": False,
            "reason": "Current model is performing well."
        }