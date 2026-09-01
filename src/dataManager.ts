export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  active: boolean;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin', active: true },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'user', active: false },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', active: true },
];

export function getUserById(id: number): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getActiveUsers(): User[] {
  // Intentional error in dataManager.ts: missing closing paren in filter call
  return mockUsers.filter(user => user.active;
}

export function getUsersByRole(role: 'admin' | 'user' | 'guest'): User[] {
  return mockUsers.filter(user => user.role === role);
}

export function formatUsersSummary(users: User[]): string {
  return users.map(u => `${u.name} <${u.email}>`).join(', ');
}
