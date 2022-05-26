import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskType} from "../Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args:{
  changeTaskStatus: action('Status changed inside Task'),
    changeTaskTitle: action('Title changed inside Task'),
    removeTask: action('Remove Button inside Task clocked'),
      },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNoteDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNoteDoneExample.args = {
  todolistId: 'todolist1',
  task: {id:'1', title:'js', isDone: false}
};

export const TaskIsDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneExample.args = {
  todolistId: 'todolist1',
  task: {id:'1', title:'js', isDone: true}
};

