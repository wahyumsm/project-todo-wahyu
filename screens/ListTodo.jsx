import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Animated,
  FlatList,
} from 'react-native';

const TodoContext = createContext();

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos !== null) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error lo :', error);
    }
  };

  const saveTodos = async updatedTodos => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error ', error);
    }
  };

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = {id: Math.random(), text: newTodoText, completed: false};
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setNewTodoText('');
      Keyboard.dismiss();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const toggleTodo = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const renderItem = ({item}) => {
    return <TodoItem todo={item} />;
  };

  const keyExtractor = item => item.id.toString();

  const filteredTodos = showCompleted
    ? todos
    : todos.filter(todo => !todo.completed);

  return (
    <TodoContext.Provider value={{toggleTodo, deleteTodo}}>
      <View style={styles.container}>
        <Text style={styles.title}>List TODO</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tambah todo "
            value={newTodoText}
            onChangeText={setNewTodoText}
            onSubmitEditing={addTodo}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.buttonText}>Tambah</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCompleted(!showCompleted)}>
          <Text style={styles.buttonText}>
            {showCompleted ? 'Tampilkan Semua' : 'Tampilkan Belum Selesai'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={filteredTodos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </TodoContext.Provider>
  );
};

const TodoItem = ({todo}) => {
  const {toggleTodo, deleteTodo} = useContext(TodoContext);

  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity
        style={[
          styles.todoItem,
          {backgroundColor: todo.completed ? '#d9d9d9' : '#e6e6e6'},
        ]}
        onPress={() => toggleTodo(todo.id)}>
        <Text
          style={[
            styles.todoText,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
            },
          ]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(todo.id)}>
        <Text style={styles.buttonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  todoItem: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 16,
    color: '#495057',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default ListTodo;
