import { watch, getTable } from './utils'

function Podtable(tableEl, config = {}) {
    /**
     * The associated table that podtable will render
     * @type HTMLTableElement
     */
    const table = getTable(tableEl)

    /**
     * This is the squishitude determinant row
     * @type HTMLTableRowElement
     */
    let targetRow

    /**
     * A wrapper for the render table
     * @returns HTMLElement
     */
    let tableContainer

    /**
     * Perform an health check on the passed table
     * @returns void
     */
    healthCheck(table)

    /**
     * Cache container width after health check passed
     */
    let oldTableContainerWidth = tableContainer.clientWidth

    /**
     * This is store for currently hidden cells
     * @type Array
     */
    let hiddenCells = []

    /**
     * Constant index of cells generated from target row
     * @type Array
     */
    let constIndex = []

    /**
     * These is store for cell that wont be hidden
     * @type Array
     */
    let keepCell = [0]

    /**
     * This is the podtable instance
     */
    let _this = this

    /**
     * This holds the current cell that is hidden
     * @returns Number
     */
    _this.current

    /**
     * Process the config options passed
     * @returns void
     */
    processConfig(config)

    /**
     * Attach event listeners for control toggle
     * @returns void
     */
    setToggleCell(table)

    /**
     * Renders the table for the first instance
     * @returns void
     */
    render()

    /**
     * Starts a mutation observer
     * @returns void
     */
    ayncRedraw(table)

    /**
     * Set rendering target row
     * @param {Boolean} passed 
     */
    function setTargetRow(passed) {
        if (passed == -1) {
            targetRow = table.tHead.rows[0]
        } else if (passed == true) {
            targetRow =  table.tBodies[0].rows[0]
        }
    }
    
    /**
     * set the wrapper for podtable
     */
    function setWrapper() {
        tableContainer = document.createElement('div')
        tableContainer.setAttribute('id', 'podtable-container')
        table.parentNode.insertBefore(tableContainer, table)
        tableContainer.appendChild(table)
    }

    /**
     * Perform health check and if it fail will throw an error
     * And set the proper target row
     * @param {HTMLTableElement} table 
     */
    function healthCheck(table) {
        let passed = true

        if (table === null) {
            throw new Error('Unable to access target HTMLTableElement')
        }

        if (!(table instanceof HTMLTableElement)) {
            throw new Error('Element is not an HTMLTableElement')
        }

        if (table.tHead === null) {
            throw new Error('Table should have only one THEAD')
        }

        if (table.tHead.rows.length <= 0) {
            throw new Error('tHead doesnt contain HTMLTableRowElement')
        }

        if (table.tHead.rows[0].cells.length < 2) {
            throw new Error('tHead HTMLTableRowElement should have atleast 2 cells')
        }

        if (table.tBodies.length <= 0 || table.tBodies.length > 1) {
            throw new Error('Table should have only one TBODY')
        }

        if (table.tBodies[0].rows.length <= 0) {
            passed =  -1
        }

        setTargetRow(passed)
        setWrapper()
    }

    /**
     * Sets the control cells CSS clasess
     * @param {String} tableEl 
     */
    function setToggleCell(table) {
        table.tHead.rows[0].lastElementChild.classList.add('main-toggle')

        for (let row of table.tBodies[0].rows) {
            row.lastElementChild.classList.add('toggle')
        }
    }

    /**
     * The method process the config options
     * * Set cell hidden priority from the right
     * * Set indexes of cells to keep
     * @param {Object} config 
     */
    function processConfig(config) {
        let tempConst = []

        for (let ci = 0; ci < targetRow.cells.length; ci++) {
            tempConst.push(ci)
        }

        if (Object.prototype.hasOwnProperty.call(config, 'priority') &&
            Array.isArray(config.priority) && config.priority.length > 0 ) {
            constIndex = Array.from(new Set(config.priority.concat(tempConst.reverse())))
        } else {
            constIndex = tempConst.reverse()
        }

        keepCell.push(tempConst.length - 1)

        if(Object.prototype.hasOwnProperty.call(config, 'keepCell')) {
            if (! Array.isArray(config.keepCell)) {
                throw TypeError('keep cell must be of type array') 
            } else {
                keepCell = [...keepCell, ...config.keepCell]
            }
        }
    }

    /**
     * Create HTMLTableRowElement element & append cell column data
     * @param {HTMLCollection} cells 
     * @returns Element Node
     */
    function childRow (cells) {
        let tr = document.createElement('tr')
        let gridTD = document.createElement('td')
        let gridRow = document.createElement('div')
        
        gridTD.colSpan = constIndex.length
        gridRow.classList.add('child-grid-row')
        tr.classList.add('child')
    
        for (let i = 0; i < cells.length; i++) {
            gridRow.append(cells[i])
        }
        
        gridTD.append(gridRow)
        tr.append(gridTD)
    
        return tr
    }

    /**
     * Create HTMLElement to append to child row
     * @param {HTMLTableRowElement} el
     * @returns Element Node
     */
    function gridCol(el) {
        let gridCol = document.createElement('div')
        gridCol.classList.add('child-grid-col')
    
        let dataColName = document.createElement('div')
        let dataColDesc = document.createElement('div')
        dataColName.innerHTML = table.tHead.rows[0].cells[el.cellIndex].innerHTML
        dataColDesc.innerHTML = el.innerHTML
    
        gridCol.append(dataColName)
        gridCol.append(dataColDesc)
        
        return gridCol
    }

    /**
     * Toggle single child row and calculate hidden element for the row 
     * @param {event} event
     */
    function toggle(e) {
        if (hiddenCells.length <= 0) { return }
        
        let parent = e.currentTarget.parentElement

        if(parent.classList.contains('has-child')) {
            parent.classList.remove('has-child')
            parent.nextElementSibling.remove()
        } else {
            parent.classList.add('has-child')
            let isHidden = []
            for (let i = 0; i < parent.cells.length; i++) {
                if (parent.cells[i].classList.contains('hidden')) {
                    isHidden.push(gridCol(parent.cells[i]))
                }
            }

            parent.parentNode.insertBefore(childRow(isHidden), parent.nextSibling)
        }
    }

    /**
     * Handles toggle all child rows event by checking which rows 
     * has child to close and which rows has no child to open
     * @param {event} event
     */
    function toggleAll(e) {
        if (hiddenCells.length <= 0) { return }

        let toggleEls = document.querySelectorAll('.toggle')
        let toggler = e.currentTarget

        if(toggler.classList.contains('expanded')) {
            for (let i = 0; i < toggleEls.length; i++) {
                let togsParent = toggleEls[i].parentElement
                if (togsParent.classList.contains('has-child')) {
                    toggleEls[i].click()
                }
            }
            
            toggler.classList.remove('expanded')
        } else {
            for (let i = 0; i < toggleEls.length; i++) {
                let togsParent = toggleEls[i].parentElement
                if (! togsParent.classList.contains('has-child')) {
                    toggleEls[i].click()
                }
            }

            toggler.classList.add('expanded')
        }
    }

    /**
     * Adds click Event listener to rows with css class of 
     * toggle and main-toggle so as to toggle child rows
     */
    function addToggleListener () {
        let togElements = document.querySelectorAll('.toggle')
        for (let i = 0; i < togElements.length; i++) {
            togElements[i].addEventListener('click', (e) => {
                toggle(e)
            })
        }

        let mainToggle = document.querySelector('.main-toggle')
        mainToggle.addEventListener('click', (e) => {
            toggleAll(e)
        })
    }

    /**
     * Check if there are hidden elements ands determine when to show
     * child row toggle button and also clean up unused css class.
     */
    function doTogglerScreen () {
        if(hiddenCells.length > 0) {
            table.classList.add('show-toggle')
        } else {
            document.querySelectorAll('.has-child').forEach(el => {
                el.classList.remove('has-child')
            })

            table.classList.remove('show-toggle')
            table.tHead.rows[0].cells[table.tHead.rows[0].cells.length - 1].classList.remove('expanded')
        }
    }

    /**
     * Check for open child rows to enable reactivity as window resizes
     * then apply changes, item are remove and added every time window resize
     * and its like this so as to get an updated data from the cells
     * parent row child row are redrawn on each control toggle.
     */
    function childRowListener () {
        let openChildRow = document.querySelectorAll('.child')
        
        if(openChildRow.length > 0) {
            let openChildParent = []

            for (let i = 0; i < openChildRow.length; i++) {
                openChildParent.push(openChildRow[i].previousElementSibling)
            }

            // Iterate from parents elements down to child elements
            for (let p = 0; p < openChildParent.length; p++) {
                let isHidden = []
                
                for (let cell of openChildParent[p].cells) {
                    if (cell.classList.contains('hidden')) {
                        isHidden.push(gridCol(cell))
                    }
                }

                // we will remove the existing child row and put another one with new data
                // we also check if the hidden cells length > 0 before inserting a new child row
                // so as to avoid empty child rows and orphaned child rows
                openChildParent[p].nextElementSibling.remove()
                
                if(hiddenCells.length > 0) {
                    openChildParent[p].after(childRow(isHidden))
                }

                doTogglerScreen()
            }
        }
    }

    /**
     * Hide cells that falls into maximum squishitude
     * Dispatch event for the current hidden cells index
     * @param {Number} index 
     */
    function hideMain(index, pt = table) {
        hiddenCells.push(index)

        for (let row of pt.rows) {
            if (!row.classList.contains('child')) {
                row.cells[index].classList.add('hidden')
            }
        }

        eventDispatch(index)
    }

    /**
     * Here we remove the hidden class and flush the hidden cells 
     * array so as to restart procedure for the current viewport.
     */
    function flush() {
        for (let i = 0; i < hiddenCells.length; i++) {
            for (let row of table.rows) {
                if (!row.classList.contains('child')) {
                    row.cells[hiddenCells[i]].classList.remove('hidden')
                }
            }
        }

        hiddenCells = []
    }

    /**
     * Recalculate Cells thats needs to be hidden after flushing
     */
    function recalc() {
        flush()
        
        for (let i = 0; i < constIndex.length; i++) {
            if (targetRow.clientWidth > tableContainer.clientWidth) {
                if (!hiddenCells.includes(constIndex[i])) {
                    if (!keepCell.includes(constIndex[i])) {
                        hideMain(constIndex[i])
                        childRowListener()
                    } 
                }
            }
        }
        
        doTogglerScreen()
    }

    /**
     * This method recalculate which cells to hide or show and dispatch
     * and event with negative index to indicate there are no hiddenCells
     */
    function resize() {
        recalc()
        
        if (hiddenCells.length <= 0) {
            eventDispatch(-1)
            childRowListener()
        }
    }


    /**
     * On page load calculate cells which  can fit into the current
     * maximum squishitude: apply visibility, attach necessary listeners.
     */
    function mount() {
        hiddenCells = []
        let ilength = constIndex.length
        
        for (let i = 0; i < ilength; i++) {

            if (targetRow.clientWidth > tableContainer.clientWidth) {
                if(! hiddenCells.includes(constIndex[i])) {
                    if (!keepCell.includes(constIndex[i])) {
                        hideMain(constIndex[i])
                    } 
                }
            }
        }
        doTogglerScreen()
    }

    /**
     * This is the resize counterpart for window resize event
     * or element watcher event
     * @see resize
     */
    function observeResize() {
        recalc()
        if (hiddenCells.length <= 0) {
            eventDispatch(-1)
            childRowListener()
        }
    }

    /**
     * Here we will start new observer or attach resize listener base on
     * client browser support for observer api and the observer api is 
     * meant to act as resize event for podtable and this is particularly
     * useful incase of element resize without window resize.
     */
    function observed() {
        let connected = false

        try {
            const observer = new ResizeObserver((entries) => {
                if (entries[0].target.clientWidth !== oldTableContainerWidth) {
                    observeResize()
                }
    
                oldTableContainerWidth = entries[0].target.clientWidth
            })

            observer.observe(tableContainer)
            connected = true
        } catch (error) {
            connected = false
        }

        return connected
    }


    /**
     * Here we will do a mount, this will be at podtable instance
     * then we will add child row event listeners after which we will
     * use three ways in listening in checking for resize on podtable
     * * Resize observer which doesnt work on all browser
     * * A custom watcher to watch element size
     * * Lastly we fallback to window resize listener.
     */
    function render() {
        mount()
        addToggleListener()

        if (!observed()) {
            try {
                watch(tableContainer, resize).start()
            } catch (err) {
                window.addEventListener('resize',  () => resize()) 
            }
        }
    }

    /**
     * On body rows child list mutation essential row attributes and events
     * will be lost hence the need to reset attriubtes and re attach necessary 
     * events listeners and also redispatch cells event but only the attached method
     * @param {String} tableEl 
     */
    function ayncRedraw(table) {
        let bodyNode = table.tBodies[0]

        function doAttributes(node) {
            node.lastElementChild.classList.add('toggle')
            node.lastElementChild.addEventListener('click', (e) => toggle(e))
        }

        const callback = (mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length === 1) {
                    if (mutation.addedNodes[0].tagName == 'TR' && !mutation.addedNodes[0].classList.contains('child')) {
                        doAttributes(mutation.addedNodes[0])
                        shouldPing()
                    }
                } else if (mutation.type === 'childList' && mutation.removedNodes.length === 1) {
                    if (mutation.removedNodes[0].tagName == 'TR' &&
                        !mutation.removedNodes[0].classList.contains('child') &&
                        mutation.removedNodes[0].classList.contains('has-child')) {
                        mutation.nextSibling.remove()
                    }
                }
            }

            if (table.tBodies[0].rows.length <= 0) {
                targetRow = table.tHead.rows[0]
            } else {
                targetRow = table.tBodies[0].rows[0]
            }

            flush()
            mount()
        }

        const observer = new MutationObserver(callback)
        observer.observe(bodyNode, { childList: true })
    }

    /**
     * For every cells hidden this method will be called which check
     * if events want to be received also attach hidden index to return object.
     * @param {Number} index 
     */
    function eventDispatch(index) {
        _this.current = index

        if (config.event) { shouldPing() }
    }

    /**
     * Call the user attached method only if the event key is in the config 
     * object and it is set to true and we will  also wrap the function call 
     * in a try catch block to avoid code execution failure.
     */
    function shouldPing() {
        if (config.event) {
            try {
                config.method(_this)
            } catch (error) {
                console.error(error)
            }
        }
    }

    if (config.event) { return _this }
}

export default Podtable