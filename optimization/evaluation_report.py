"""
Evaluation Report Generator
"""


class EvaluationReport:
    """
    Generates a shipment evaluation report.
    """

    def generate(self, evaluation_result):
        report = {
            "status": evaluation_result.get("status"),
            "optimized_cost": evaluation_result.get("optimized_cost"),
            "actual_cost": evaluation_result.get("actual_cost"),
            "cost_difference": evaluation_result.get("cost_difference"),
            "roi": evaluation_result.get("roi"),
            "feedback": evaluation_result.get("feedback"),
            "evaluation": evaluation_result.get("evaluation")
        }

        return report