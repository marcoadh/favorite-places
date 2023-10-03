class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def human_enum_name(enum_name, enum_value)
    I18n.t("activerecord.enums.#{model_name.i18n_key}.#{enum_name}.#{enum_value}")
  end

  def enum_collection_for_select(enum_name, ignore: [])
    ignore = ignore.class == Array ? ignore : [ignore]
    ignore.map!(&:to_s)
    self.send(enum_name.to_s.pluralize).map do |enum_key, enum_value|
      next if ignore.include?(enum_key)
      [human_enum_name(enum_name, enum_key), enum_key]
    end.compact
  end
end
