import unittest
from calc import add, multiply, divide, parse_and_sum

class TestCalculator(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

    def test_multiply(self):
        self.assertEqual(multiply(4, 5), 20)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5.0)

    def test_parse_and_sum(self):
        self.assertEqual(parse_and_sum("10, 20, 30"), 60)

if __name__ == "__main__":
    unittest.main()
