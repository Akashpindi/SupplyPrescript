from recommendation_engine import RecommendationEngine

engine = RecommendationEngine()

result = engine.recommend(
    cost=4500,
    delay=24,
    weight=500
)

print(result)