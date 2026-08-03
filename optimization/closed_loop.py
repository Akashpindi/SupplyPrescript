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

    def evaluate(self, cost, delay, weight):
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
    else:
        result["feedback"] = (
            "Shipment rejected. Review constraints and resubmit."
       )
    return result    