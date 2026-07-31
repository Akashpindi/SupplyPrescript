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
        try:
            cost = float(cost)
            delay = float(delay)
            weight = float(weight)
        except (TypeError, ValueError):
            return {
                "status": "Error",
                "message": "Invalid input. Cost, delay and weight must be numeric values."
            }
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
        transport_options = [
            {"mode": "Road", "cost": 4500, "delay": 24},
            {"mode": "Rail", "cost": 3900, "delay": 40},
            {"mode": "Air", "cost": 6500, "delay": 8},
        ] 
        best_option = min(transport_options, key=lambda x: x["cost"])
        transport_mode = best_option["mode"]

        return {
            "status": "Approved",
            "optimized_cost": round(optimized_cost, 2),
            "message": "Shipment is valid and optimized.",
            "transport_mode": transport_mode,
        }
    