/// <reference types="cypress"/>
let Chance = require('chance');
let chance = new Chance()

const urlAvatar = 'https://i.pinimg.com/originals/d0/c7/53/d0c7531fce574a61116b00eb52ad8d08.png'
const mgsAlerta = 'Cadastro realizado com sucesso!'
const whatsApp = chance.phone()
const bio = chance.paragraph()
const cost = chance.integer({ min: 0, max: 100 })

context('Cadastro Page', () => {
    beforeEach(() => {
        cy.visit('/')

    });
    it('Cadastrar para dar aulas', () => {
        cy.server()
        cy.route('GET', '/connections').as('getConnections');
        cy.route('POST', '/classes').as('postClasses');

        cy.get('div a.give-classes').click()
        cy.url().should('contain', 'give-classes')
        cy.get('input[id=name]').type(chance.name())
        cy.get('input[id=avatar]').type(urlAvatar)
        cy.get('input[id=whatsapp]').type(whatsApp)
        cy.get('textarea[id=bio]').type(bio)
        cy.get('#subject').select('História')
        cy.get('#cost').type(cost)
        cy.get('button[type=BUTTON]').click()
        cy.get('div #week_day').first().select('Sábado')
        cy.get('div #from').first().type('10:10')
        cy.get('div #to').first().type('12:10')
        cy.get('div #week_day').last().select('Quinta-feira')
        cy.get('div #from').last().type('12:10')
        cy.get('div #to').last().type('13:10')
        cy.get('button[type=submit]').click()

        //Validação msg de alerta após salvar cadastro
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains(mgsAlerta);
        })

        //Validação de direcionamento para url da página principal após salvar cadastro
        cy.url().should('eq', 'http://localhost:3000/')

        cy.wait('@getConnections').then((getConnetions) => {
            //validação status code igual a 200
            expect(getConnetions.status).to.eq(200)
            //validação total de connections já realizadas >=5    
            expect(getConnetions.response.body.total)
                .an('number')
                .satisfy((totalValue) => { return totalValue >= 5 })
        })

        cy.wait('@postClasses').then((postClasses) => {
            //Validação status code 201
            expect(postClasses.status).to.eq(201)
            //Validação statusText é igual 201 (Created)
            expect(postClasses.statusMessage).to.equal('201 (Created)')

            //Validações para os horarios de aulas disponíveis cadadastrados 
            //Validação atributo class_id não é nulo
            expect(postClasses.response.body[0]).to.have.property('class_id').not.null
            //Validação para verificar se o dia da semana igual a 1
            expect(postClasses.response.body[0]).to.have.property('week_day', '6')
            //Validação para o horario de inicio da aula
            expect(postClasses.response.body[0]).to.have.property('from', 610)
            //Validação para o horario de fim da aula
            expect(postClasses.response.body[0]).to.have.property('to', 730)
            //Validação atributo class_id não é nulo
            expect(postClasses.response.body[1]).to.have.property('class_id').not.null
            //Validação para verificar se o dia da semana igual a 1
            expect(postClasses.response.body[1]).to.have.property('week_day', '4')
            //Validação para o horario de inicio da aula
            expect(postClasses.response.body[1]).to.have.property('from', 730)
            //Validação para o horario de fim da aula
            expect(postClasses.response.body[1]).to.have.property('to', 790)

            //Validação se o body do response possui tamanho igual 2
            expect(postClasses.response.body).to.have.length('2')

        })

    });

});

