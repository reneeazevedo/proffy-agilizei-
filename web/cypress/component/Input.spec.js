/// <reference types="cypress"/>
import React from 'react'
import PageHeader from '../../src/components/Input'
import { mount } from 'cypress-react-unit-test'
import { BrowserRouter as Router } from 'react-router-dom'




context('Input component', () => {
    const baseCss = '/__root/src/assets/styles/global.css'
    const indexCss = '/__root/src/components/input/styles.css'
    it('deve ser renderizado com sucesso', () => {
        const label = "Nome Completo"
        const name = "fullname"
        mount(
            <Router>

                <div className="input-block">
                    <label htmlFor={name}>{label}</label>
                    <input type="text" id={name} />
                </div>

            </Router>
            ,
            {
                stylesheets: [baseCss, indexCss]
            })
        //Validação para o texto do label
        cy.get('label').should('have.text', label)
        //Validação para verificar se o input está visível 
        cy.get('input#fullname').should('be.visible')

        //Validação para a cor de fundo e fonte da página
        cy.get('body').then(($elemento) => {
            expect($elemento.css('background-color')).to.be.equal('rgb(240, 240, 247)')
            expect($elemento.css('font')).to.be.equal('500 16px Poppins')       

        })
        //Validação de largura, altura e tamanho da fonte do label
        cy.get('.input-block label').then(($elemento) => {
            expect($elemento.css('width')).to.be.equal('92.9375px')
            expect($elemento.css('height')).to.be.equal('15px')
            expect($elemento.css('font-size')).to.be.equal('14px')
         
        })
        //Validação das propriedades de estilo aplicadas na página
        cy.get('.input-block input').then(($elemento) => {
            expect($elemento.css('background-color')).to.be.equal('rgb(248, 248, 252)')
            expect($elemento.css('width')).to.be.equal('1000px')
            expect($elemento.css('height')).to.be.equal('56px')
            expect($elemento.css('Margin')).to.be.equal('8px 0px 0px')
        })

        

    });
});