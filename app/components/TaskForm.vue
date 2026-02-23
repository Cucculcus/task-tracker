<template>
  <div
    class="grid grid-cols-1 pt-12 min-w-full h-3/4 sm:h-full lg:h-9/10 gap-y-3 relative"
  >
    <div class="justify-self-start absolute">
      <slot name="breadcrumps"></slot>
    </div>

    <UFormField
      :label="$t('createTaskWindow.taskTitle.title')"
      :ui="{
        root: 'w-full justify-self-center sm:justify-self-start lg:w-1/2',
        label: 'w-full flex justify-center sm:text-lg sm:block',
        container: 'flex justify-center items-center w-full sm:block ',
      }"
    >
      <UInput
        v-model="title"
        :color="formErrors.titleError ? 'error' : 'neutral'"
        highlight
        :placeholder="$t('createTaskWindow.taskTitle.placeholder')"
        :ui="{ base: 'sm:text-lg', root: 'w-2/3 lg:w-full' }"
      />
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.priority.title')"
      :ui="{
        root: 'justify-self-center sm:justify-self-start w-2/3 sm:w-full',
        label: 'flex justify-center items-center w-full sm:block sm:text-lg',
        container:
          'grid grid-cols-5 gap-x-3 items-center sm:grid-cols-24 sm:justify-start lg:grid-cols-4 ',
      }"
    >
      <USelect
        v-model="severityChoice"
        highlight
        :color="'neutral'"
        :items="severityItems"
        :ui="{
          base: 'col-span-4 sm:col-span-16 lg:col-span-2',
          value: 'sm:text-lg',
        }"
      ></USelect>
      <TaskSeverityIcon :severity="severityChoice" :height="24" :width="24" />
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.date.title')"
      class="justify-self-center sm:justify-self-start w-full"
      :ui="{
        label: 'flex w-full justify-center sm:block sm:text-lg',
        root: 'sm:justify-items-start justify-items-center ',
        container: 'w-2/3 grid grid-cols-1 gap-2 sm:gap-6 lg:w-1/2',
      }"
    >
      <UInputDate
        v-model="plannedCompletionCalendarDate"
        :color="
          formErrors.emptyPlannedCompletionDateField || formErrors.uncorrectDate
            ? 'error'
            : 'neutral'
        "
        highlight
        :ui="{
          base: 'w-full min-h-8 py-0.5 sm:gap-2 sm:min-h-10',
          segment: 'sm:whitespace-nowrap sm:text-lg',
        }"
      />
      <UInputTime
        v-model="plannedCompletionCalendarTime"
        :color="
          formErrors.emptyPlannedCompletionDateField || formErrors.uncorrectDate
            ? 'error'
            : 'neutral'
        "
        highlight
        :ui="{ base: 'w-full', segment: 'sm:text-lg ' }"
      />
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.taskDescription.title')"
      :ui="{
        root: 'w-5/7 justify-self-center sm:w-2/3 sm:justify-self-start lg:w-1/2',
        label: 'flex justify-center items-center sm:block sm:text-lg',
      }"
    >
      <UTextarea
        v-model="text"
        :color="formErrors.emptyContentError ? 'error' : 'neutral'"
        highlight
        :placeholder="$t('createTaskWindow.taskDescription.placeholder')"
        :ui="{ root: 'w-full', base: 'text-lg' }"
      />
    </UFormField>

    <UFormField
      v-if="task?.subtasks?.length > 0"
      :label="$t('createTaskWindow.subtasks.title')"
      :ui="{
        root: 'justify-self-center w-3/4 sm:justify-self-start lg:absolute lg:right-0 lg:w-1/3 ',
        label:
          'flex w-full justify-center items-center sm:text-lg sm:justify-start lg:flex-row-reverse lg:justify-center',
        container:
          'flex items-center justify-center sm:justify-start sm:text-lg lg:justify-center',
      }"
    >
      <div class="flex flex-col gap-2">
        <slot name="subtasks"></slot>
      </div>
    </UFormField>

    <div
      class="grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:w-1/2"
      :class="{ 'lg:grid-cols-2 ': task }"
    >
      <UButton
        v-if="task"
        :ui="{
          base: 'justify-center lg:min-h-20 w-3/4 justify-self-center sm:text-lg sm:justify-self-start ',
        }"
        :label="$t('createTaskWindow.subtasks.createButton')"
        color="neutral"
        variant="subtle"
        @click="emit('onCreateSubtask')"
      />

      <UButton
        :ui="{
          base:
            'w-3/4 sm:text-lg justify-center justify-self-center sm:justify-self-start lg:justify-self-end ' +
            (task ? 'lg:justify-self-start' : 'lg:justify-self-start lg:w-1/2 sm:w-2/3'),
        }"
        @click="onSubmitClick"
        >{{
          task
            ? `${$t('createTaskWindow.createButtonText.edit')}`
            : `${$t('createTaskWindow.createButtonText.create')}`
        }}</UButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'
import type { severity } from '~/types/task.model'

const { t } = useI18n()
const emit = defineEmits(['submit', 'onCreateSubtask', 'formError'])

const props = defineProps<{
  task?: Task
}>()

const formErrors = computed(() => {
  return {
    titleError: title.value
      ? ''
      : t('createTaskWindow.toasts.error.titleError.title'),

    emptyPlannedCompletionDateField: plannedCompletionDate.value
      ? ''
      : t('createTaskWindow.toasts.error.emptyDate.title'),

    uncorrectDate:
      plannedCompletionDate.value > new Date()
        ? ''
        : t('createTaskWindow.toasts.error.uncorrectDate.title'),

    emptyContentError:
      text.value || props.task?.subtasks?.length > 0
        ? ''
        : t('createTaskWindow.toasts.error.emptyContent.title'),
  }
})

const firstError = computed(
  () => Object.values(formErrors.value).find(Boolean) ?? null,
)

const hasError = computed<boolean>(() => {
  return !!firstError.value
})

const title = ref(props.task?.title ?? '')
const severityItems = ref([
  { label: `${t('createTaskWindow.priority.value.hard')}`, value: 'hard' },
  { label: `${t('createTaskWindow.priority.value.middle')}`, value: 'middle' },
  { label: `${t('createTaskWindow.priority.value.easy')}`, value: 'easy' },
])
const severityChoice = ref<severity>(props.task?.severity ?? 'easy')

const text = ref(props.task?.text ?? '')

const plannedCompletionCalendarTime = ref(
  props.task ? dateToTime(props.task?.plannedCompletionDate) : null,
)
const plannedCompletionCalendarDate = ref(
  props.task ? dateToCalendarDate(props.task?.plannedCompletionDate) : null,
)

const plannedCompletionDate = computed(() => {
  if (
    plannedCompletionCalendarDate.value &&
    plannedCompletionCalendarTime.value
  ) {
    return calendarDateTimeToDate(
      plannedCompletionCalendarDate.value,
      plannedCompletionCalendarTime.value,
    )
  }
  return null
})

const onSubmitClick = () => {
  if (hasError.value) {
    emit('formError', firstError.value)
  } else {
    emit('submit', {
      title,
      severity: severityChoice,
      text,
      plannedCompletionDate,
    })
  }
}
</script>
