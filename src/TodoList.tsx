import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, TouchableHighlight, Pressable, StatusBar, Image, } from 'react-native';

interface TodoItem {
  completed: any;
  id: string;
  text: string;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks state changes
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [
        ...tasks,
        { id: Date.now().toString(), text: newTask, completed: false },
      ];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={style.view}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'yellow'} />
      <View style={style.header}>
        <Text style={style.headertitle}>TODO APP</Text>

      </View>

      <FlatList

        data={tasks}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[style.listview]} >
            <Text style={{
              flex: 1,
              backgroundColor: 'yellow',
              color:'black',
            opacity:0.7,
              fontSize: 20, fontWeight: '500',
            }}>{item.text}</Text>
            <CustomCheckbox
              label={require('../assets/images/checkicons.png')}
              isChecked={item.completed}
              onToggle={() => toggleTaskCompletion(item.id)}
            />
            <Pressable onPress={() => deleteTask(item.id)} style={style.deletbuttoncontainer}>
              <View style={style.deletebox}>
                <Image style={style.deleteimage} source={require('../assets/images/deleteicons.png')} />
              </View>
            </Pressable>
          </View>
        )}

      />
      <View style={style.footer}>
        <View style={style.inputContainer}>
          <TextInput placeholder="Add Todo" value={newTask}
            onChangeText={(text) => setNewTask(text)} />

        </View>
        <TouchableOpacity onPress={addTask}>
          <View style={style.iconContainer}>
            <Text style={style.addtext}>+</Text>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
};
interface ButtonProps {
  label: any,
  isChecked: any,
  onToggle: any,
}
const CustomCheckbox = ({ label, isChecked, onToggle }: ButtonProps) => {
  return (
    <Pressable onPress={onToggle}>
      <View style={style.checkboxContainer}>
        <View style={style.checkbox}>
          {
            isChecked && <Image style={style.image} source={label} />
          }
        </View>



      </View>
    </Pressable>
  );
};
const style = StyleSheet.create({

  view: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  checkmark: {
    fontSize: 20,
    color: 'white', // You can change the color of the checkmark
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headertitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  textfieldContainer: {
    flexDirection: 'row'
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'center',
  },
 
  footer: {
    width: '100%',
    backgroundColor: 'yellow',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    color: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: 'yellow',
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'purple',
    borderRadius: 25,
    elevation: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  listview: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 20

  },
  addtext: {
    fontSize: 20,
    color: 'white',


  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,

  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'green'
  },
 
  deletbuttoncontainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  deletebox: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'red'
  },
  deleteimage: {
height:18,
width:18,

  },
})

export default TodoApp;
