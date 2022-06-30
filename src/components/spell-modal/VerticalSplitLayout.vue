<template>
  <div class="flex gap-8">
    <div class="flex-none max-w-[8rem]">
      <div class="">
        <div class="mt-2">
          <label class="font-bold">Level</label>
          <p>{{ formattedLevel }}</p>
        </div>
        <div class="mt-2">
          <label class="font-bold">School</label>
          <p>{{ spell.school }}</p>
        </div>
        <div class="mt-2">
          <label class="font-bold">Source</label>
          <p>{{ spell.source }} {{ spell.page }}</p>
        </div>
        <div class="mt-2">
          <label class="font-bold">Duration</label>
          <p>{{ formattedDuration }}</p>
        </div>
        <div class="mt-2">
          <label class="font-bold">Range</label>
          <p>{{ formattedRange }}</p>
        </div>
        <div class="mt-2">
          <label class="font-bold">Casting</label>
          <p>{{ formattedCasting }}</p>
        </div>
        <div class="mt-2" v-if="spell.isRitual">
          <label class="font-bold">Ritual</label>
          <p>{{ capitalize(spell.isRitual.toString()) }}</p>
        </div>
        <div class="mt-2" v-if="spell.isConcentration">
          <label class="font-bold">Concentration</label>
          <p>{{ capitalize(spell.isConcentration.toString()) }}</p>
        </div>
      </div>
    </div>
    <div class="flex-1 w-full flex flex-col lg:flex-row gap-x-8">
      <div class="mt-2 flex-1 w-full lg:min-w-[24rem] max-w-xl">
        <div v-if="spell.description && spell.description.paragraph.length > 0">
          <label class="font-bold">Description</label>
          <div
            v-for="(p, i) in spell.description.paragraph"
            :key="i"
            class="mb-1"
          >
            {{ p }}
          </div>
          <div v-if="spell.description.list !== undefined">
            <ol
              v-for="(p, i) in spell.description.list.rows"
              :key="i"
              class="mb-1"
            >
              <li>
                <label
                  v-if="
                    spell.description.list != null &&
                    spell.description.list.headers &&
                    spell.description.list.headers[i]
                  "
                  class="font-semibold block"
                >
                  {{ spell.description.list.headers[i] }}
                </label>
                <span v-else>- </span>
                {{ p }}
              </li>
            </ol>
          </div>
          <table v-if="spell.description.table !== undefined" class="mt-2">
            <thead>
              <tr class="mb-1">
                <th
                  v-for="(h, i) in spell.description.table.headers"
                  :key="i"
                  class="text-left pr-4 border-b py-2"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in spell.description.table.rows" :key="i">
                <td
                  v-for="(h, hi) in spell.description.table.headers"
                  :key="hi"
                  class="py-1"
                >
                  {{ r[hi] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="
            spell.higher != undefined &&
            spell.higher.paragraph != undefined &&
            spell.higher.paragraph.length > 0
          "
          class="mt-2"
        >
          <label class="font-bold">At Higher Levels</label>
          <div v-for="(h, j) in spell.higher.paragraph" :key="j" class="mb-1">
            {{ h.replace("At Higher Levels: ", "") }}
          </div>
        </div>
      </div>
      <div class="flex-2 min-w-[8rem] max-w-lg">
        <div class="grid">
          <div class="">
            <div class="mt-2">
              <label class="font-bold">Components</label>
              <p>{{ formattedComponents }}</p>
            </div>
            <div
              v-if="formattedBaseClasses && formattedBaseClasses.length > 0"
              class="mt-2"
            >
              <label class="font-bold">Classes</label>
              <div>
                <div v-for="(c, i) in formattedBaseClasses" :key="i">
                  {{ c.source }} - {{ c.classes }}
                </div>
              </div>
            </div>
            <div
              v-if="formattedSubClasses && formattedSubClasses.length > 0"
              class="mt-2"
            >
              <label class="font-bold">Sub Classes</label>
              <div>
                <div v-for="(c, i) in formattedSubClasses" :key="i">
                  {{ c.source }} - {{ c.classes }}
                </div>
              </div>
            </div>
            <div
              v-if="
                formattedVariantClasses && formattedVariantClasses.length > 0
              "
              class="mt-2"
            >
              <label class="font-bold">Variant Classes</label>
              <div>
                <div v-for="(c, i) in formattedVariantClasses" :key="i">
                  {{ c.source }} - {{ c.classes }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
