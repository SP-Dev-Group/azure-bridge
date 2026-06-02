import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const firstNames = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Quinn', 'Blake', 'Cameron'];
const lastNames = ['Chen', 'Patel', 'Rivera', 'Johnson', 'Kim', 'Okafor', 'Martinez', 'Singh', 'Williams', 'Nakamura'];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const unique_id = `P-${String(Math.floor(Math.random() * 9000) + 1000)}`;

    const record = await base44.entities.People.create({ unique_id, name });

    return Response.json({ record });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});