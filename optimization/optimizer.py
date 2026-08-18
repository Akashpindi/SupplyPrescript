"""
Optimization Engine Design
"""
from scipy.optimize import minimize
from .constraints import (
    MAX_SHIPMENT_COST,
    MAX_DELAY_HOURS,
    MAX_WEIGHT_KG,
)


class ShipmentOptimizer:
    """
    Validates shipment data against business constraints.
    """

    def validate_constraints(self, cost, delay, weight):
        if cost > MAX_SHIPMENT_COST:
            return False, "Shipment cost exceeds allowed limit."

        if delay > MAX_DELAY_HOURS:
            return False, "Shipment delay exceeds allowed limit."

        if weight > MAX_WEIGHT_KG:
            return False, "Shipment weight exceeds allowed limit."

        return True, "All constraints satisfied."


    def optimize_cost(self, cost):
        """
        Minimize shipment cost.
        """

        def objective(x):
            return (x[0] - cost) ** 2

        result = minimize(
            objective,
            x0=[cost],
            bounds=[(0, MAX_SHIPMENT_COST)]
        )
        optimized_cost = float(round(result.x[0], 2))

        return optimized_cost