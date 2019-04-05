
import { has, cloneDeep, assign } from './helpers'

const REQUIRED_PROPERTIES = [
    'settings_schema'
]

class InvalidPluginError extends Error {

}

class PluginManager {

    constructor() {
        this.registry = {}
        this.globalPreview = null
    }

    add_global_preview(globalPreview) {
        this.globalPreview = globalPreview
    }

    register(name, plugin) {
        for (let i = 0; i < REQUIRED_PROPERTIES.length; i++) {
            if (!has(plugin, REQUIRED_PROPERTIES[i])) {
                throw new InvalidPluginError({message: 'Not a valid Plugin. A plugin must have property ' + REQUIRED_PROPERTIES[i]});
            }
        }
        this.registry[name] = plugin
    }

    get_blocks() {
        let available_blocks = []
        for (const key in this.registry) {
            if (has(this.registry, key)) {
                const block = this.registry[key]
                if (has(block, 'view_as_block') && block.view_as_block == false) {
                    continue
                } else {
                    available_blocks.push({
                        name: key,
                        title: block.title,
                        description: block.description
                    })
                }
            }
        }
        return available_blocks
    }

    get_default_values_for(name) {
        const internal = {
            type: name,
            children: []
        }
        const plugin_defaults =  cloneDeep(this.registry[name].default_values)
        return { ...internal, ...plugin_defaults }
    }

    get_available_styles_for(name) {
        if (has(this.registry, name)) {
            return this.registry[name].config.styles
        }
    }

    get_settings_schema_for(name) {
        if (has(this.registry, name)) {
            return this.registry[name].settings_schema
        }
    }

    get_config_for(name) {
        if (has(this.registry, name)) {
            return this.registry[name].config
        }
    }

    override_block_configurations(configs) {
        for(const key in configs) {
            if (has(configs, key) && has(this.registry, key)) {
                this.registry[key].config = assign(this.registry[key].config, configs[key])
            }
        }
    }

    preview(forObj, callback) {
        if(this.globalPreview) {
            this.globalPreview(forObj, callback)
        }
        else if (has(this.registry, forObj.type)) {
            this.registry[forObj.type].config.preview(forObj, callback)
        }
    }

    getVueComponent(name) {
        if (has(this.registry, name)) {
            const config = this.registry[name].config
            if (has(config, 'vueComponent')) {
                return config.vueComponent
            }
        }
        return false
    }
}

export default PluginManager