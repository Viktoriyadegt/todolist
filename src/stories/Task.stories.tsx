import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Tasks from "../state/Tasks.";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Tasks,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        editableTaskTitle: action('Title changed inside task'),
        onChangeTaskStatus: action('Status changed inside task'),
        removeTask: action('Remove button inside task was clicked'),
    },
} as ComponentMeta<typeof Tasks>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tasks> = (args) => <Tasks {...args} />;

export const TasksNotIsDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TasksNotIsDoneExample.args = {
    tasks: {id: '1', title: 'js', isDone: false},
    todolistId: 'todolist1'
};

export const TasksIsDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TasksIsDoneExample.args = {
    tasks: {id: '2', title: 'css', isDone: true},
    todolistId: 'todolist2'
};
