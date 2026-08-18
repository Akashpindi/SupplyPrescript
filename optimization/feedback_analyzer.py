"""
Feedback Analyzer for SupplyPrescript
"""


class FeedbackAnalyzer:
    """
    Analyzes shipment evaluation feedback
    and identifies performance trends.
    """

    def analyze(self, evaluation_report):
        feedback = {
            "status": evaluation_report.get("status"),
            "roi": evaluation_report.get("roi"),
            "evaluation": evaluation_report.get("evaluation"),
        }

        if feedback["roi"] == "Negative":
            feedback["action"] = "Improve optimization strategy"
        else:
            feedback["action"] = "Current strategy is effective"

        return feedback