def add(a: int, b: int) -> int:
    return a + b

def multiply(a: int, b: int) -> int:
    return a * b

def divide(a: int, b: int) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def parse_and_sum(csv_line: str) -> int:
    # Bug: splitting on semicolon instead of comma
    return sum(int(x.strip()) for x in csv_line.split(";"))
