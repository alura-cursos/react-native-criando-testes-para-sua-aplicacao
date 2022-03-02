import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { ENVIADO } from '../../../negocio/constantes/estadosLance';

export default function EnviaLance({ enviaLance, cor }) {
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  const estilos = funcaoEstilos(cor, erro);

  const validaEnvio = async () => {
    setEnviando(true);
    setErro('');
    setSucesso('');

    const estadoLance = await enviaLance(valor);

    if (estadoLance === ENVIADO) {
      setValor('');
      setSucesso(estadoLance);
    } else {
      setErro(estadoLance);
    }

    setEnviando(false);
  }

  return <BlurView intensity={Platform.OS === 'ios' ? 10 : 100} style={estilos.fundo} tint="light">
    {!!erro && <Text style={estilos.erro}>{erro}</Text>}
    {!!sucesso && <Text style={estilos.sucesso}>{sucesso}</Text>}
    <TextInput 
      value={valor} 
      onChangeText={setValor}
      placeholder="R$"
      editable={!enviando}
      style={estilos.entrada}
      keyboardType="decimal-pad"
    />
    <TouchableOpacity 
      accessibilityHint="Enviar lance"
      onPress={validaEnvio}
      disabled={enviando}
      style={estilos.botao}>
      <FontAwesome5 name="check" size={24} color="#14181B" />
    </TouchableOpacity>
  </BlurView>
}

const funcaoEstilos = (cor, erro) => StyleSheet.create({
  fundo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    padding: 8,
    flexWrap: 'wrap',
  },
  erro: {
    width: '100%',
    marginHorizontal: 8,

    color: '#FF0000',

    fontSize: 14,
    marginBottom: 8,
  },
  sucesso: {
    width: '100%',
    marginHorizontal: 8,

    color: '#2d6628',

    fontSize: 14,
    marginBottom: 8,
  },
  entrada: {
    flex: 1,
    borderWidth: 1,
    borderColor: erro ? '#FF0000' : '#4A4A4A',
    color: erro ? '#FF0000' : '#4A4A4A',
    borderRadius: 16,
    height: 53,

    padding: 16,
    margin: 8,

    textAlign: 'center',
    fontSize: 16,
  },
  botao: {
    margin: 8,
    padding: 16,
    backgroundColor: cor,
    borderRadius: 16,
  },
});