import unittest
from calc import add, multiply, divide

class TestCalculator(unittest.TestCase):
    def test_add(self):
        # Intentional bug in test: should be 5
        self.assertEqual(add(2, 3), 6, "Addition test failure for PipelineIQ self-healing")

    def test_multiply(self):
        self.assertEqual(multiply(4, 5), 20)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5.0)

if __name__ == "__main__":
    unittest.main()
