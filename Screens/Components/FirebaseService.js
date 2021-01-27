import {FBDatabase, FBStorage} from './FirebaseUtil'

export default class FirebaseService {
    //Pegando, salvando e deletando imagens
    static downloadImage = async(path, callback) => {
        var storageRef = FBStorage.ref()

        let imageRef = storageRef.child(path);
        let DownloadUrl = ''
        await imageRef.getDownloadURL().then((url) => {
            callback(url)
        }).catch((e) => console.log('getting downloadURL of image error => ', e));
    }
    // Pegando, salvando e deletando Tags
    static getTagData = async (key, callback) =>{
        await FBDatabase.ref('Tags/'+key).once('value', dataSnapshot =>{
            let item = dataSnapshot.val();
            item['key'] = dataSnapshot.key;
            callback(item)
        })
    }
    static getAllTagData = async(callback) =>{
        await FBDatabase.ref('Tags').on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                item['checked'] = false;
                items.push(item);
            });
            callback(items);
        });
    }
    //Pegando, salvando e deletando Noticias
    
    static getAllNoticiaData = async(callback) =>{
        await FBDatabase.ref('Noticias').on('value', (dataSnapshot) =>{
            let items = [];
            dataSnapshot.forEach(childSnapshot=>{
                let item = childSnapshot.val();
                item['id'] = childSnapshot.key;
                items.push(item)
            })
            callback(items)
        })
    }

    static getNoticiaData = async(id, callback) =>{
        let item
        await FBDatabase.ref('Noticias/'+id).once('value', dataSnapshot =>{
            item = dataSnapshot.val();
            item['id'] = dataSnapshot.key;
        })
        await FBDatabase.ref('Conteudo/' + item.id).once('value', conteudoSnapshot =>{
            item['Conteudo'] = conteudoSnapshot.val()
        })
        await FBDatabase.ref('Links/' + item.id).once('value', conteudoSnapshot =>{
            item['Links'] = conteudoSnapshot.val()
            if(item.Links === null){
                item.Links = []
            }
        })
        callback(item)
    }
};