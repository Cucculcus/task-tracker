<template>
  <div class="grid grid-cols-1 min-w-full min-h-full gap-y-3">
    <div class="justify-self-start">
      <slot name="breadcrumps"></slot>
    </div>

    <UFormField
      :label="$t('createTaskWindow.taskTitle.title')"
      :ui="{
        root: 'justify-self-center sm:justify-self-start w-full',
        label: 'w-full flex justify-center sm:text-lg sm:block',
        container: 'flex justify-center items-center w-full sm:block',
      }"
    >
      <UInput
        v-model="title"
        :color="formErrors.titleError ? 'error' : 'neutral'"
        highlight
        :placeholder="$t('createTaskWindow.taskTitle.placeholder')"
        :ui="{ base: 'sm:text-lg sm:w-2/3', root: 'sm:w-full w-2/3' }"
      />
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.priority.title')"
      :ui="{
        root: 'justify-self-center sm:justify-self-start w-full',
        label: 'sm:text-lg flex justify-center items-center w-full sm:block',
        container: 'flex justify-center sm:block',
      }"
    >
      <div class="w-2/3 sm:w-full flex gap-3 items-center">
        <USelect
          v-model="severityChoice"
          highlight
          :color="'neutral'"
          :items="severityItems"
          :ui="{
            base: 'flex-1 sm:max-w-2/3',
            value: 'sm:text-lg',
          }"
        ></USelect>
        <TaskSeverityIcon
          :severity="severityChoice"
          class="flex-none"
          :height="24"
          :width="24"
        />
      </div>
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.date.title')"
      class="justify-self-center sm:justify-self-start w-full"
      :ui="{
        label: 'flex w-full justify-center sm:block sm:text-lg',
      }"
    >
      <div
        class="grid grid-cols-1 justify-items-center sm:justify-items-start gap-2 sm:gap-6"
      >
        <UInputDate
          v-model="plannedCompletionCalendarDate"
          :color="
            formErrors.emptyPlannedCompletionDateField ||
            formErrors.uncorrectDate
              ? 'error'
              : 'neutral'
          "
          highlight
          :ui="{
            base: 'sm:text-lg w-2/3 py-0.5 sm:gap-2 min-h-8 sm:min-h-10',
            segment: 'sm:whitespace-nowrap ',
          }"
        />
        <UInputTime
          v-model="plannedCompletionCalendarTime"
          :color="
            formErrors.emptyPlannedCompletionDateField ||
            formErrors.uncorrectDate
              ? 'error'
              : 'neutral'
          "
          highlight
          :ui="{ base: 'sm:text-lg w-2/3' }"
        />
      </div>
    </UFormField>

    <UFormField
      :label="$t('createTaskWindow.taskDescription.title')"
      :ui="{
        root: 'w-5/7 sm:w-2/3 justify-self-center sm:justify-self-start',
        label: 'sm:text-lg flex justify-center items-center sm:block',
      }"
    >
      <UTextarea
        class="w-full"
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
        root: 'justify-self-center sm:justify-self-start w-3/4',
        label: 'flex w-full justify-center items-center sm:text-lg',
        container: 'flex items-center justify-center sm:text-lg',
      }"
    >
      <div class="flex flex-col gap-2">
        <slot name="subtasks"></slot>
      </div>
    </UFormField>

    <div
      class="grid grid-cols-1 gap-y-2 lg:grid-cols-2 lg:gap-y-0 lg:max-w-5/8"
    >
      <UButton
        v-if="task"
        :ui="{
          base: 'justify-center',
        }"
        :label="$t('createTaskWindow.subtasks.createButton')"
        color="neutral"
        variant="subtle"
        class="w-3/4 justify-self-center sm:text-lg sm:justify-self-start"
        @click="emit('onCreateSubtask')"
      />

      <UButton
        class="w-3/4 sm:text-lg"
        :ui="{
          base: 'justify-center justify-self-center sm:justify-self-start',
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
import type { container, textarea } from '#build/ui'
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
