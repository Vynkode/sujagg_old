import faunadb from 'faunadb';

export const db = faunadb.query;

export const clientDb = new faunadb.Client({
  secret: 'fnAEKEcRPkACBbIdocg3a_awE11Crz5UAG7nMXOZ',
});
