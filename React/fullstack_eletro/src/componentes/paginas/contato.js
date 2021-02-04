import React from 'react';
import {connect} from 'react-redux';
import {inserir} from './../../actions/mensagens';
import {passe_livre,passe_negado} from './../../actions/passe'

const estados = (states) =>{
    return{
        mensagens: states.mensagens,
        passe: states.passe
    }
}

const funcoes = () =>{
    return{
        inserir,
        passe_livre,
        passe_negado
    }
}

class Contato extends React.Component{
    
    constructor(props){
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
    }

    async componentDidMount(){
        if(this.props.passe){
            const resposta = await fetch ('http://localhost:5000/pegarMensagem');
            const json = await resposta.json ();
            this.props.inserir(json)
            this.props.passe_negado()
        }

    }

    async enviarFormulario(elemento){
        elemento.preventDefault();
        const url = "http://localhost:5000/enviarMensagem";
        const dados = new FormData(elemento.target);
        let json ={}
        dados.forEach((valor, chave) => {
            json[chave] = valor;
        })
        const cabecalho = {
            method: "post",
            body: JSON.stringify(json),
            headers:{
                'Content-Type':'application/json'
            }
        }
        fetch(url,cabecalho)
        .then(document.getElementById('form').reset())
        .then(alert('Mensagem Enviada!'));
    }

    render(){
        return(
            
            <div>

                <br/><br/>
                
                <header>
        
                    <h2>Contato</h2>
        
                </header>
        
                <hr/>
        
                <table className="table">
                  
                   <thead> 
                        <tr>
            
                            <td className="text-center w-50">
                                
                                <img src={require('./../../Imagens/Email.png').default} width="40px" alt=""/>
                                contato@fullstackeletro.com
            
                            </td>
            
                            <td className="text-center w-50">
                                
                                <img src={require('./../../Imagens/Whatsapp.png').default} width="40px" alt=""/>
                                (11) 99999-9999
            
                            </td>
            
                        </tr>
                    </thead>
        
                </table>
        
                <br/><br/>
        
                <form className="form-group formulario" onSubmit={this.enviarFormulario} id="form">
        
                    <h4>Nome</h4>
                    <input className="form-control caixa_mensagem" type="text" name="nome" placeholder="Escreva aqui o seu nome"/>
                    <h4>E-mail</h4>
                    <input className="form-control caixa_mensagem" type="email" name="email" placeholder="Insira aqui seu email" />
                    <h4>Mensagem</h4>
                    <textarea rows="8" placeholder="Deixe aqui sua mensagem" name="msg" className=" form-control caixa_mensagem"></textarea>
                    <input className="btn btn-lg mt-2 btn-danger" type="submit" onClick= {this.props.passe_livre} value="Enviar"/>
        
                </form>

                <div className="container-fluid" >
                    <div className="row" >
                        <div className="col">
                            <h3>Comentarios de nossos clientes:</h3>
                            <div className="list-group">
                                {this.props.mensagens.map(mensagem =>(
                                    <div className="list-group-item">
                                        <h5>{mensagem.nome}</h5>
                                        <p>{mensagem.msg}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            
                <br/><br/><br/><br/>
                    
            </div>
        );
    }
}
export default connect(estados, funcoes())(Contato)