"""
Recommendation Improvement Module
"""


class RecommendationImprover:
    """
    Updates recommendation strategy
    based on evaluation feedback.
    """

    def improve(self, feedback):
        if feedback.get("roi") == "Negative":
            return {
                "status": "Updated",
                "message": "Recommendation strategy adjusted."
            }

        return {
            "status": "No Change",
            "message": "Current recommendation strategy is effective."
        }