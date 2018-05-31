import { AbstractPojo } from './AbstractPojo';
import { Endereco } from './Endereco';
import { UsuarioRestaurante } from './UsuarioRestaurante';
import { Usuario } from './Usuario';
import { Cardapio } from './Cardapio';

export class Restaurante extends AbstractPojo {

    razaoSocial = null;
    nomeFantasia = null;
    cnpj = null;
    endereco: Endereco = null;
    logo_file = null;
    telefone = null;
    usuariosRestaurante: UsuarioRestaurante[];
    cardapios: Cardapio[];

    initialize(object) {
        this._initialize(object);
        this.razaoSocial = object.razaoSocial;
        this.nomeFantasia = object.nomeFantasia;
        this.cnpj = object.cnpj;
        this.endereco = new Endereco();
        this.endereco.initialize(object.endereco);
        this.logo_file = object.logo_file;
        this.telefone = object.telefone;
        this.usuariosRestaurante = new Array<UsuarioRestaurante>();
        this.cardapios = new Array<Cardapio>();
    }

    public initializeUsuariosRestaurante(object) {
        if (object != null) {
            object.forEach(data => {
                let usuarioRestaurante: UsuarioRestaurante = new UsuarioRestaurante();
                usuarioRestaurante.initialize(data);
                this.usuariosRestaurante.push(usuarioRestaurante);
            });
        }
    }

    public initializeCardapios(object) {
        if (object != null) {
            object.forEach(data => {
                let cardapio: Cardapio = new Cardapio();
                cardapio.initialize(data);
                this.cardapios.push(cardapio);
            });
        }
    }

    public removerUsuario(login: String) {
        const usuarios = this.usuariosRestaurante.filter((usuarioRestaurante) => {
            return usuarioRestaurante.usuario.login === login;
        });
        const index = this.usuariosRestaurante.indexOf(usuarios[0]);
        this.usuariosRestaurante.splice(index, 1);
    }

    public getUsuario(login: string): UsuarioRestaurante {
        const usuarioRestaurante: UsuarioRestaurante[] = this.usuariosRestaurante.filter(usuarioRestaurante => {
            return usuarioRestaurante.usuario.login === login;
        });
        return usuarioRestaurante[0];
    }

    constructor() {
        super();
        this.endereco = new Endereco;
        this.usuariosRestaurante = new Array<UsuarioRestaurante>();
    }
}
