// components/ui/CurriculoDropdown.tsx

import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCurriculo } from '../../hooks/useCurriculo';

export function CurriculoDropdown() {
  const {
    pessoas,
    selectedPessoa,
    selectedPessoaId,
    setSelectedPessoaId,
    loadingPessoas,
    errorPessoas,
  } = useCurriculo();

  const [open, setOpen] = useState(false);

  if (loadingPessoas) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Currículo</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Carregando currículos...</Text>
        </View>
      </View>
    );
  }

  if (errorPessoas) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Currículo</Text>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Erro ao carregar currículos</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Currículo selecionado</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(selectedPessoa?.nome || '?')
              .split(' ')
              .slice(0, 2)
              .map((name) => name[0])
              .join('')
              .toUpperCase()}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.buttonText}>
            {selectedPessoa?.nome || 'Selecionar currículo'}
          </Text>

          {!!selectedPessoa?.titulo && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {selectedPessoa.titulo}
            </Text>
          )}
        </View>

        <Text style={styles.chevron}>⌄</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.modal}>
            <Text style={styles.modalTitle}>Escolha um currículo</Text>

            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {pessoas.map((pessoa) => {
                const active = pessoa.id === selectedPessoaId;

                return (
                  <TouchableOpacity
                    key={pessoa.id}
                    style={[styles.option, active && styles.optionActive]}
                    onPress={() => {
                      setSelectedPessoaId(pessoa.id);
                      setOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionAvatar}>
                      <Text style={styles.optionAvatarText}>
                        {(pessoa.nome || '?')
                          .split(' ')
                          .slice(0, 2)
                          .map((name) => name[0])
                          .join('')
                          .toUpperCase()}
                      </Text>
                    </View>

                    <View style={styles.optionInfo}>
                      <Text style={styles.optionName}>{pessoa.nome}</Text>

                      {!!pessoa.titulo && (
                        <Text style={styles.optionTitle} numberOfLines={1}>
                          {pessoa.titulo}
                        </Text>
                      )}
                    </View>

                    {active && <Text style={styles.activeIcon}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  label: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#38BDF855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#38BDF8',
    fontWeight: '900',
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  buttonText: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '900',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  chevron: {
    color: '#38BDF8',
    fontSize: 22,
    fontWeight: '900',
  },
  errorBox: {
    backgroundColor: '#7F1D1D33',
    borderWidth: 1,
    borderColor: '#EF444455',
    borderRadius: 14,
    padding: 12,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#020617',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1F2937',
    padding: 18,
    maxHeight: '75%',
  },
  modalTitle: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 16,
  },
  list: {
    marginBottom: 14,
  },
  option: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  optionActive: {
    borderColor: '#38BDF8',
    backgroundColor: '#38BDF811',
  },
  optionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#38BDF855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionAvatarText: {
    color: '#38BDF8',
    fontWeight: '900',
    fontSize: 13,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '900',
  },
  optionTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  activeIcon: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '900',
  },
  closeButton: {
    backgroundColor: '#38BDF8',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '900',
  },
});