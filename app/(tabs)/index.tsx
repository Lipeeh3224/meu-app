import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [nome, setNome] = useState('');
  const [categoriaModalVisible, setCategoriaModalVisible] = useState(false);
  const [categoriasRoupas, setCategoriasRoupas] = useState([
    { label: 'Camisetas', value: 'camisetas' },
    { label: 'Calças', value: 'calças' },
    { label: 'Vestidos', value: 'vestidos' },
    { label: 'Casacos', value: 'casacos' },
    { label: 'Sapatos', value: 'sapatos' },
  ]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotoSelecionada, setFotoSelecionada] = useState(null);

  const salvar = () => {
    console.log({
      nome,
      categoria: categoriaSelecionada,
      precoVenda,
      precoCompra,
      subtitulo,
      descricao,
      foto: fotoSelecionada
    });
  };

  const escolherFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFotoSelecionada(result.uri);
    }
  };

  const tirarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFotoSelecionada(result.uri);
    }
  };

  const renderCategoriaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoriaItem}
      onPress={() => {
        setCategoriaSelecionada(item.value);
        setCategoriaModalVisible(false);
      }}
    >
      <Text style={styles.categoriaText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setCategoriaModalVisible(true)}
      >
        <Text style={styles.categoriaText}>{categoriaSelecionada || 'Selecione uma Categoria'}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Preço de Venda"
          value={precoVenda}
          onChangeText={setPrecoVenda}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Preço de Compra"
          value={precoCompra}
          onChangeText={setPrecoCompra}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Subtítulo"
        value={subtitulo}
        onChangeText={setSubtitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.photoButton} onPress={escolherFoto}>
          <Text>Escolher Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} onPress={tirarFoto}>
          <Text>Tirar Foto</Text>
        </TouchableOpacity>
      </View>
      {fotoSelecionada && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: fotoSelecionada }} style={styles.image} />
        </View>
      )}
      <Button title="Salvar" onPress={salvar} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={categoriaModalVisible}
        onRequestClose={() => setCategoriaModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={categoriasRoupas}
              renderItem={renderCategoriaItem}
              keyExtractor={(item) => item.value}
            />
            <Button
              title="Fechar"
              onPress={() => setCategoriaModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  halfInput: {
    width: '48%',
  },
  photoButton: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
  },
  categoriaItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  categoriaText: {
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default App;
