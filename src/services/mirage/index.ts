import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
    name: string;
    email: string;
    created_at: string;
};

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },
        models: {
            user: Model.extend<Partial<User>>({}),
        },
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`;
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },
            }),
        },
        seeds(server) {
            server.createList('user', 200);
        },
        routes() {
            this.namespace = 'api';
            this.timing = 750; // tempo de respostas da api

            this.get('/users', function (scheme, request) {
                const { page = 1, per_page = 10 } = request.queryParams;
                const total = scheme.all('user').length;
                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);
                const users = this.serialize(scheme.all('user')).users.slice(pageStart, pageEnd);
                return new Response(200, { 'x-total-count': String(total) }, { users });
            });
            this.get('/users/:id');
            this.post('/users');

            this.namespace = ''; // depois de criar as rotas ele reseta o namespace api para não prejudicar as api routes do nextjs
            this.passthrough(); // definir quando utilizar nextjs, assim se o miragejs não encontrar a rota e repassas para frente
        },
    });
    return server;
}
