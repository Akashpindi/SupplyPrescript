"""
Recommendation Engine for SupplyPrescript
"""

from optimizer import ShipmentOptimizer


class RecommendationEngine:
    """
    Generates shipment recommendations based on
    optimization results and business constraints.
    """

    def __init__(self):
        self.optimizer = ShipmentOptimizer()

    def recommend(self, cost, delay, weight):
        valid, message = self.optimizer.validate_constraints(
            cost,
            delay,
            weight
        )

        if not valid:
            return {
                "status": "Rejected",
                "reason": message
            }

        optimized_cost = self.optimizer.optimize_cost(cost)

        return {
            "status": "Approved",
            "optimized_cost": round(optimized_cost, 2),
            "message": "Shipment is valid and optimized."
        }
    