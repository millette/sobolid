function Dl(props) {
  return (
  <div class="border-t border-gray-200">
        <dl>
          {props.children}
        </dl>
      </div>
  )
}

function DtDd(props) {
  return (
    <div class="odd:bg-gray-50 even:bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">        
    <dt class="text-sm font-medium text-gray-500">{props.dt}</dt>
   <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{props.dd}</dd>
</div>
  )
}

export { Dl, DtDd }
