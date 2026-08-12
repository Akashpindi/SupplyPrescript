"""
Closed Loop Evaluation for SupplyPrescript
"""

from .recommendation_engine import RecommendationEngine


class ClosedLoopEvaluator:
    """
    Evaluates shipment recommendations
    and provides feedback for future optimization.
    """

    def __init__(self):
        self.engine = RecommendationEngine()

    def evaluate(self, cost, delay, weight, actual_cost=None):
        """
        Evaluate shipment recommendation.
        """

        result = self.engine.recommend(
            cost,
            delay,
            weight
        )

        if result["status"] == "Approved":
            result["feedback"] = (
                "Optimization completed successfully. "
                "Recommendation can be used for future shipments."
            )
            if actual_cost is not None:
                result["actual_cost"] = actual_cost
                result["cost_difference"] = round(
                    actual_cost - result["optimized_cost"],
                    2
                )

                if actual_cost <= result["optimized_cost"]:
                    result["evaluation"] = "Prediction Successful"
                else:
                    result["evaluation"] = "Prediction Needs Improvement"

                if actual_cost <= result["optimized_cost"]:
                    result["roi"] = "Positive"
                    result["savings"] = round(
                        result["optimized_cost"] - actual_cost,
                        2
                    )
                else:
                    result["roi"] = "Negative"
                    result["extra_cost"] = round(
                        actual_cost - result["optimized_cost"],
                        2
                    )
        else:
            result["feedback"] = (
                "Shipment rejected. Review constraints and resubmit."
            )
        return result    